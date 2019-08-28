
const devotionsModel = {
    getDevotions(conn, coll){
        try {
            return new Promise((resolve, reject) => {
                let devotions = conn.collection(coll).find().sort( { quote_date: 1 } ).toArray();
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
    },
    getDevotionById(conn, params, coll){
        try {
            return new Promise((resolve, reject) => {
                let devotions = conn.collection(coll).find(params).toArray();
                resolve(devotions);
            });
        } catch (error) {
            reject(error);
        }
    },
    updateDevotion(conn, where, data, coll){
        try {
            return new Promise(async (resolve, reject) => {
                let update = await conn.collection(coll).updateOne(where, data, { upsert: true });
                resolve(true);
            })
        } catch (error) {
            reject(error);
        }
    },
    getVerse(conn, params){
        try {
            return new Promise(async (resolve, reject) => {
                let data = await conn.collection('verse').find(params).toArray();
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
    },
    updateVerse(conn, where, data){
        try {
            return new Promise(async (resolve, reject) => {
                let update = await conn.collection('verse').updateOne(where, data, { upsert: true });
                resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    },
    getTestimonies(conn) {
        try {
            return new Promise(async (resolve, reject) => {
                let data = await conn.collection('testimonies').find().toArray();
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
    },
    updateTestimonies(conn, req) {
        try {
            return new Promise(async (resolve, reject) => {
                let params = {
                    $set: {...req.body}
                }
                let data = await conn.collection('testimonies').updateMany({},params, { upsert: true});
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }

        
        
    }
}

module.exports = devotionsModel;