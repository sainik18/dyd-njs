
const authmodel = {
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