const Site = require('../modules/sites/site.model');
const Connection = require('../modules/connections/connection.model');
const SiteConnection = require('../modules/sites/siteConnection.model');
const System = require('../modules/systems/system.model');
const SystemNumber = require('../modules/systems/systemNumber.model');
const ImportType = require('../modules/importTypes/importType.model');
const ProcessControl = require('../modules/processControl/processControl.model');

const defineAssociations = () => {
    // System <-> Connection
    System.hasMany(Connection, { foreignKey: 'systemId' });
    Connection.belongsTo(System, { foreignKey: 'systemId' });

    // Site <-> Connection (Through SiteConnection)
    Site.hasMany(SiteConnection, { foreignKey: 'siteId' });
    SiteConnection.belongsTo(Site, { foreignKey: 'siteId' });

    Connection.hasMany(SiteConnection, { foreignKey: 'connectionId' });
    SiteConnection.belongsTo(Connection, { foreignKey: 'connectionId' });

    // SiteConnection <-> SystemNumber
    SiteConnection.hasMany(SystemNumber, { foreignKey: 'siteConnectionId' });
    SystemNumber.belongsTo(SiteConnection, { foreignKey: 'siteConnectionId' });

    // ProcessControl (Import) Associations
    Site.hasMany(ProcessControl, { foreignKey: 'siteId' });
    ProcessControl.belongsTo(Site, { foreignKey: 'siteId' });

    ImportType.hasMany(ProcessControl, { foreignKey: 'importTypeId' });
    ProcessControl.belongsTo(ImportType, { foreignKey: 'importTypeId' });

    SystemNumber.hasMany(ProcessControl, { foreignKey: 'systemNumberId' });
    ProcessControl.belongsTo(SystemNumber, { foreignKey: 'systemNumberId' });
};

module.exports = defineAssociations;
