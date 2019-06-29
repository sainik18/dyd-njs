
const devotionsModel = {
    getDevotions(conn){
        try {
            return new Promise((resolve, reject) => {
                let devotions = conn.collection('devotions').find().toArray();
                resolve(devotions);
            });
        } catch (error) {
            reject(error);
        }
    },
    insertDevotion(conn,data,coll){
        try {
            return new Promise((resolve, reject) => {
                let ins = conn.collection(coll).insertOne(data);
                resolve(ins);
            });
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = devotionsModel;