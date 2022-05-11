const { custom_tables: Table } = require('../../utils/database');
const path = require('path');
const fs = require('fs').promises;
const db = require("../../utils/database")

exports.createTable = async (req, res, next) => {
    const { tablename, tableInfo } = req.body;
    const tableColumns = Object.keys(tableInfo);
    console.log(req.body)
    try {
        const table = await Table.create({ tablename, tableColumns });

        // Write Schema
        const outputDirectory = `../../utils/customModels/${tablename}.js`;
        const filePath = path.join(__dirname, outputDirectory)
        console.log(filePath)
        // console.log(filePath)

        const nameCapitalize = tablename.charAt(0).toUpperCase() + tablename.slice(1);

        const pluralize = tablename.charAt(tablename.length) === 'y' ? tablename.padEnd(tablename.length + 2, 'ies') : tablename.padEnd(tablename.length + 1, 's');
        const stringTo = a => Object.entries(a).map(([k, v]) => `${k}: ${v}`).join(', ');

        const value = `module.exports = (sequelize, DataTypes) => {\n const ${nameCapitalize} = sequelize.define("${tablename}", {\n${Object.keys(tableInfo).map(item => item + ": {\n" + stringTo(tableInfo[item]) + "\n},\n").join("")}\n})\nreturn ${nameCapitalize}}`;

        fs.writeFile(filePath, value);

        // Write in database for creating table

        const relativeDatabaseFilePath = `../../utils/database.js`;
        const databaseFilePath = path.join(__dirname, relativeDatabaseFilePath);

        const read = await fs.readFile(databaseFilePath);
        const ArrData = read.toString().split(";");

        const line = `\ndb.${pluralize} = require("./customModels/${tablename}")(sequelize, DataTypes)`;

        if (!ArrData.includes(line)) {

            ArrData.splice(ArrData.length - 2 , 0, line);
            const strData = ArrData.join(";");

            fs.writeFile(databaseFilePath, `\n${strData}`);
        }

        db.sequelize.sync({ alter: true })
            .then(() => console.log("sync done"))
            .catch(err => console.log(err));


        res.status(200).json({
            success: true,
            msg: 'Table Created'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.getTables = async (req, res, next) => {
    try {
        const tables = await Table.findAll();
        res.status(200).json({
            success: true,
            tables
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.dropTable = async (req, res, next) => {
    const table = await Table.findOne({ where: { id: req.params.id } })
    const tablename = table.tablename;
    const outputDirectory = `../../utils/customModels/${tablename}.js`;
    const filePath = path.join(__dirname, outputDirectory)
    const pluralize = tablename.charAt(tablename.length) === 'y' ? tablename.padEnd(tablename.length + 2, 'ies') : tablename.padEnd(tablename.length + 1, 's');

    try {
        db.sequelize.getQueryInterface().dropTable(`${pluralize}`);
        await Table.destroy({ where: { tablename: tablename } })

        fs.unlink(`${filePath}`, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully deleted the file.")
            }
        });

        const relativeDatabaseFilePath = `../../utils/database.js`;
        const databaseFilePath = path.join(__dirname, relativeDatabaseFilePath);

        const read = await fs.readFile(databaseFilePath);
        const ArrData = read.toString().split(";");

        const line = `\ndb.${pluralize} = require("./customModels/${tablename}")(sequelize, DataTypes)`;
        
        const modifiedArr = ArrData.filter(item => item !== line)
        
        const strData = modifiedArr.join(";");
        fs.writeFile(databaseFilePath, `\n${strData}`);

        db.sequelize.sync({ alter: true })
            .then(() => console.log("sync done"))
            .catch(err => console.log(err));

        res.status(200).json({
            success: true,
            tablename
        })
    } catch (error) {
        msg: error.message
    }

}