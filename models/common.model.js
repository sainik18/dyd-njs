const bcrypt = require('bcrypt');
const saltRounds = 10;

const commonModel = {
    encrypt(password) {
        return new Promise(async (resolve, reject) => {
            try {
                let hash = await bcrypt.hash(password, saltRounds);
                resolve(hash);
            } catch (error) {
                reject(error);
            }
        });

    },
    compareHash(password, hash) {
        return new Promise(async (resolve, reject) => {
            try {
                let compare = await bcrypt.compare(password, hash);
                resolve(compare);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = commonModel;