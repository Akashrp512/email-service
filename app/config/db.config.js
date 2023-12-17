
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: null,
//     DB: "world",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };



// db.config.js
module.exports = {
    dialect: "sqlite",
    storage: "../../sqlite/database.sqlite", // Store in root with a folder named 'sqlite'
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
