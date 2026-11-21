/**
 * Crea un usuario administrador del DW, o le resetea la contraseña si el email ya existe.
 * Sirve para el primer usuario y para recuperar el acceso.
 *
 * Uso (dentro del contenedor):
 *   docker exec -it cdp-api node src/scripts/createUser.js
 */
const readline = require('readline');
const sequelize = require('../config/database');
const User = require('../modules/auth/user.model');
const { validateEmail, validatePassword } = require('../modules/users/user.service');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Oculta lo que se escribe mientras se pide la contraseña
let muted = false;
rl._writeToOutput = (text) => {
    if (!muted) rl.output.write(text);
};

// El iterador guarda las líneas en orden: funciona tanto tipeando como con input por pipe
const lines = rl[Symbol.asyncIterator]();

const ask = async (question, hidden = false) => {
    rl.output.write(question);
    muted = hidden;
    const { value, done } = await lines.next();
    muted = false;
    if (hidden && process.stdin.isTTY) rl.output.write('\n');
    if (done) throw new Error('Se cortó la entrada antes de completar los datos');
    return value.trim();
};

const main = async () => {
    await sequelize.authenticate();

    const email = await ask('Email: ');
    validateEmail(email);

    const existing = await User.findOne({ where: { email } });
    if (existing) {
        console.log(`El usuario ${existing.username} ya existe: se le va a cambiar la contraseña y se va a activar.`);
    }
    const username = existing ? existing.username : await ask('Usuario: ');
    if (!username) throw new Error('El usuario es obligatorio');

    const password = await ask('Contraseña: ', true);
    validatePassword(password);
    const confirm = await ask('Repetir contraseña: ', true);
    if (password !== confirm) throw new Error('Las contraseñas no coinciden');

    if (existing) {
        existing.password = password; // se hashea en el hook beforeUpdate del modelo
        existing.isActive = true;
        existing.updatedAt = sequelize.fn('GETDATE');
        await existing.save();
        console.log(`Contraseña actualizada: ${existing.username} <${email}>`);
    } else {
        await User.create({ username, email, password, isActive: true });
        console.log(`Usuario creado: ${username} <${email}>`);
    }
};

main()
    .catch((err) => {
        console.error(`Error: ${err.message}`);
        process.exitCode = 1;
    })
    .finally(async () => {
        rl.close();
        await sequelize.close();
    });
