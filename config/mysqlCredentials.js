module.exports = {
    database: 'exam_db',
    user: 'root',
    password: 'password',
    sessionSecret: 'some session secret',
    host: "localhost",
    //operatorsAliases: false,

    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};