const ProcessControl = require('./processControl.model');

const sequelize = require('../../config/database');

const findAll = async () => {
    return await ProcessControl.findAll();
};

const getProcessStatus = async () => {
    const query = `
        SELECT               SI.name        AS 'siteName' 
   
  
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
                    FROM connection AS C
                    INNER JOIN system AS S ON S.id = C.systemId
                    INNER JOIN siteConnection AS SC ON SC.connectionId = C.id
                    INNER JOIN [dw].[site] AS SI ON SI.id = SC.siteId 
                    INNER JOIN [dbo].[systemNumber] AS SN ON SN.siteConnectionId = SC.id
					INNER JOIN [stg].[import] AS I ON I.systemNumberId = SN.id
                    INNER JOIN [stg].[importType] AS IT ON IT.id = I.importTypeId
                    ORDER BY SI.name ASC, I.dateProcess DESC
    `;

    return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
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
