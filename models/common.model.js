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

    }
}

module.exports = commonModel;