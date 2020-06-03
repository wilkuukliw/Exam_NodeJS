module.exports = {
    database: 'exam_db',
    user: 'root',
    password: 'password',
    sessionSecret: 'some session secret',
    host: "http://ec2-35-153-78-103.compute-1.amazonaws.com:5002",
    //operatorsAliases: false,

    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

