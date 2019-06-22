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
    translate(conn, text, lang) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await commonModel.getTranslation(conn, text, lang);
                console.log(data, 334);
                if(data){
                    console.log("existing lang request");
                    resolve(data);
                }else{
                    translate.translate(text, { to: lang }, function(err, res) {
                        console.log(res);
                        if(res.code == 200){
                            console.log("new lang request");
                            commonModel.insertTranslation(conn, text, lang, res.text[0]);
                            resolve(res.text[0]);
                        }
                        
                      });
                }
                
            } catch (error) {
                reject(error);
            }
        })
    },
    getTranslation(conn, text, lang){
        return new Promise(async (resolve, reject) => {
            try {
                let params = {
                    lang: lang,
                    eng: text 
                };
                let data = await conn.collection('translate').find(params).toArray();
                if(data.length > 0){
                    resolve(data[0].conText);
                }else {
                    resolve(false);
                }

            } catch (error) {
                resolve(error);                
            }
        });
    },
    insertTranslation(conn, text, lang, conText){
        try {
            let params = {
                lang: lang,
                text: text,
                conText: conText
            }
            let ins = conn.collection('translate').insertOne(params);
            return true;
        } catch (error) {
            console.log(err, 122);
        }
    }

}

module.exports = commonModel;