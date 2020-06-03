module.exports = {
    database: 'examdb',
    user: 'admin',
    password: 'password',
    sessionSecret: 'some session secret',
    host: "examdb.cab7koaw8w48.us-east-1.rds.amazonaws.com",
    //operatorsAliases: false,

    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

