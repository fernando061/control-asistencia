import { Sequelize } from "sequelize";
require("dotenv").config()
export default new Sequelize(process.env.DATABASE_URL ?? "",{
    logging:false,
    dialect:'mysql',
});
  

// export default new Sequelize('premierplus_intranet_V2','sa','dba',{
//     dialect:'mssql',
//     host:'localhost',
//     port :57295
// });
  