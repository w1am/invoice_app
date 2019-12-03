require('dotenv').config({path: '../.env'}).parsed;

export default {
    "dbuser": process.env.DB_USER,
    "dbpassword": process.env.DB_PASSWORD,
    "hostname": process.env.HOSTNAME,
    "port": process.env.PORT,
    "name": process.env.NAME,
}