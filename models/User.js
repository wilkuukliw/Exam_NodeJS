const { Model } = require('objection');  //ORM that connect relational data in db to objects in js

class User extends Model {

    static tableName = 'users'

}

module.exports = User;