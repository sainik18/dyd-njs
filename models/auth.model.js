
const authmodel = {
    checkAdminExists(conn, params){
        try {
            return new Promise((resolve, reject) => {
                let adminData = conn.collection('admin').find(params).toArray();
                resolve(adminData);
            });
        } catch (error) {
            reject(error);
        }
    },
    adminRegister(conn, data) {
        try {
            return new Promise((resolve, reject) => {
                let reg = conn.collection('admin').insertOne(data);
                resolve(reg);
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }
}

module.exports = authmodel;