const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://dydcoza:dydcoza%40123@ds155596.mlab.com:55596/dydcoza';
function mongoConn() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url).then(client => {
            resolve(client.db());
        });

    })

}

module.exports = mongoConn;