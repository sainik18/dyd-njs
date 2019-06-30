
const devotionsModel = {
    getDevotions(conn, coll){
        try {
            return new Promise((resolve, reject) => {
                let devotions = conn.collection(coll).find().toArray();
                resolve(devotions);
            });
        } catch (error) {
            reject(error);
        }
    },
    insertDevotion(conn,data,coll){
        try {
            return new Promise(async (resolve, reject) => {
                let ins = await conn.collection(coll).insertOne(data);
                resolve(ins);
            });
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = devotionsModel;