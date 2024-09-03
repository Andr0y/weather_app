const { MongoClient } = require('mongodb');

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/mydb')
            .then((client) => {
                global.dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            })
    },
    getDb: () => global.dbConnection
}
