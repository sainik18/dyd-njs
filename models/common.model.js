const bcrypt = require('bcrypt');
const saltRounds = 10;
var translate = require('yandex-translate')('trnsl.1.1.20190622T020046Z.37f546fd27402fad.0c18b2c4fd273c20955094777a21433b30ab3d3b');

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
    },
    translate(text, lang) {
        return new Promise(async (resolve, reject) => {
            try {
                translate.translate(text, { to: lang }, function(err, res) {
                    console.log(res);
                    if(res.code == 200){
                        resolve(res.text);
                    }
                    
                  });
            } catch (error) {
                reject(error);
            }
        })
    }

}

module.exports = commonModel;