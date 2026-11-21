const ProcessControl = require('./processControl.model');

const sequelize = require('../../config/database');

const findAll = async () => {
    return await ProcessControl.findAll();
};

// stg.import no guarda si la importación salió bien o mal, solo cuándo corrió cada sala
// (dateProcess) y hasta qué fecha hay datos (referenceDate). El estado se deduce de eso:
//   Deshabilitada: el sitio está deshabilitado (la ETL no lo procesa)
//   Atrasada:      no corrió dentro de lo esperable (la ETL de Contadores corre cada 30 min)
//   Sin datos nuevos: corre, pero el origen no tiene datos nuevos hace más de STUCK_DAYS días
//   Al día:        el resto
const LATE_MINUTES_CONTADORES = 60;      // importType code 100, cron cada 30 min
const LATE_MINUTES_DAILY = 26 * 60;      // otros tipos (procesos diarios)
const STUCK_DAYS = 3;

const getProcessStatus = async () => {
    const query = `
        SELECT               SI.id          AS 'siteId'
                        ,SI.name        AS 'siteName'
   
  
                        ,C.name         AS 'connectionName' 
						 
						 ,S.name         AS 'system'
                         ,C.dbhost       AS 'dbhost'
                        ,C.dbname		AS 'dbname'	

                     
                        ,CASE WHEN DATEDIFF(DAY,SN.importDate,I.referenceDate) > SN.daysBack AND SN.daysBack > 0 THEN DATEADD(DAY,-SN.daysBack,I.referenceDate)
                                WHEN SN.daysBack  = 0 THEN SN.importDate
                                ELSE SN.importDate
                        END             AS 'dateFrom'
                        ,CASE WHEN ISNULL(I.referenceDate,0) = 0 THEN DATEADD(DAY,SN.daysForward,SN.importDate)
	                                                              ELSE DATEADD(DAY,SN.daysForward,I.referenceDate)
                        END             AS 'dateTo'

						,C.apibase_url  AS 'apibase_url'
						,SI.enabled
						,IT.name as importType
						,I.dateProcess
						,I.referenceDate
                        ,I.systemNumberId
                        ,SN.number      AS 'systemNumber'
                        ,DATEDIFF(MINUTE, I.dateProcess, GETDATE())   AS 'minutesSinceProcess'
                        ,DATEDIFF(DAY, I.referenceDate, GETDATE())    AS 'daysSinceReference'
                        ,CASE
                            WHEN SI.enabled = 0 THEN N'Deshabilitada'
                            WHEN DATEDIFF(MINUTE, I.dateProcess, GETDATE()) >
                                 CASE WHEN IT.code = 100 THEN :lateContadores ELSE :lateDaily END THEN N'Atrasada'
                            WHEN DATEDIFF(DAY, I.referenceDate, GETDATE()) > :stuckDays THEN N'Sin datos nuevos'
                            ELSE N'Al día'
                         END            AS 'status'
                    FROM connection AS C
                    INNER JOIN system AS S ON S.id = C.systemId
                    INNER JOIN siteConnection AS SC ON SC.connectionId = C.id
                    INNER JOIN [dw].[site] AS SI ON SI.id = SC.siteId 
                    INNER JOIN [dbo].[systemNumber] AS SN ON SN.siteConnectionId = SC.id
					INNER JOIN [stg].[import] AS I ON I.systemNumberId = SN.id
                    INNER JOIN [stg].[importType] AS IT ON IT.id = I.importTypeId
                    ORDER BY I.dateProcess DESC, SI.name ASC
    `;

    return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
            lateContadores: LATE_MINUTES_CONTADORES,
            lateDaily: LATE_MINUTES_DAILY,
            stuckDays: STUCK_DAYS,
        },
    });
};

const findById = async (id) => {
    return await ProcessControl.findByPk(id);
};

module.exports = {
    findAll,
    getProcessStatus,
    findById,
};
