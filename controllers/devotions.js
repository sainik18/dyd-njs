const devotionsModel = require('../models/devotions.model');
const commonModel = require('../models/common.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const https = require('https');
const fs = require('fs');
const aws = require('aws-sdk');
const asyncBusboy = require("async-busboy");

// const s3 = new AWS.S3({
//     AWSAccessKeyId: 'AKIAJHYNVES6AKXTKJQA',
//     AWSSecretKey: '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'
// });

const devotions = {
    getAllDevotions: async (req, res) => {

        // let translate = await commonModel.translate(req.db, text, 'en-ru');
        // res.json({data: translate});
        //let lang = req.body.lang;
        let byDate = new Date();
        byDate.setTime(byDate.getTime() + (1 * 60 * 60 * 1000))
        let pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 15);

        let day = byDate.getDate();
        let month = byDate.getMonth() + 1;
        let year = byDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month
        }

        let nDate = year + '-' + month + '-' + day;

        let pday = pastDate.getDate();
        let pmonth = pastDate.getMonth() + 1;
        let pyear = pastDate.getFullYear();
        if (pday < 10) {
            pday = '0' + pday;
        }
        if (pmonth < 10) {
            pmonth = '0' + pmonth
        }

        let pDate = pyear + '-' + pmonth + '-' + pday;

        const { lang } = { ...req.body };

        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        let where = {
            'quote_date': { $lte: nDate, $gte: pDate }
        };
        console.log(where);
        let devotions = await devotionsModel.getDevotions(req.db, where, collection);

        if (devotions.length > 0) {
            res.json({ status: true, data: devotions });
        } else {
            res.json({ status: false, msg: 'No data found!' });
        }
    },
    getDevotions: async (req, res) => {

        // let translate = await commonModel.translate(req.db, text, 'en-ru');
        // res.json({data: translate});
        //let lang = req.body.lang;
        const { lang, date } = { ...req.body };
        let byDate = new Date();
        byDate.setTime(byDate.getTime() + (1 * 60 * 60 * 1000))
        if (date) {
            byDate = date;
        };

        let pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 15);

        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        let day = byDate.getDate();
        let month = byDate.getMonth() + 1;
        let year = byDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month
        }

        let nDate = year + '-' + month + '-' + day;

        let pday = pastDate.getDate();
        let pmonth = pastDate.getMonth() + 1;
        let pyear = pastDate.getFullYear();
        if (pday < 10) {
            pday = '0' + pday;
        }
        if (pmonth < 10) {
            pmonth = '0' + pmonth
        }

        let pDate = pyear + '-' + pmonth + '-' + pday;

        let where = {
            'quote_date': { $lte: nDate, $gte: pDate }
        }
        let devotions = await devotionsModel.getDevotions(req.db, where, collection);

        if (devotions.length > 0) {
            res.json({ status: true, data: devotions });
        } else {
            res.json({ status: false, msg: 'No data found!' });
        }
    },
    insertDevotion: async (req, res) => {
        const { topic, bible_verse, devotion, prayer, confession, quote_date, lang } = { ...req.body };

        let params = {
            topic,
            bible_verse,
            devotion,
            prayer,
            confession,
            quote_date
        }
        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        // check whether devotion exists on given date
        let rparams = {
            quote_date
        }

        let checkExists = await devotionsModel.getDevotionById(req.db, rparams, collection);
        if (checkExists.length > 0) {
            res.json({ status: false, msg: 'Devotion exists on given date' });
        } else {
            let ins = await devotionsModel.insertDevotion(req.db, params, collection);
            if (ins.insertedCount > 0) {
                res.json({ status: true, msg: 'Devotion inserted successfully!' })
            } else {
                res.json({ status: false, msg: 'Something Went Wrong!' });
            }
        }

    },
    getDevotionById: async (req, res) => {
        const { _id, lang } = { ...req.body };
        let params = {
            _id: new ObjectId(_id)
        }
        let collection = devotions.getCollectionName(lang);

        let devotion = await devotionsModel.getDevotionById(req.db, params, collection);

        if (devotion.length > 0) {
            res.json({ status: true, data: devotion });
        } else {
            res.json({ status: false, msg: 'No data found!' });
        }

    },
    getDevotionByDate: async (req, res) => {
        const { quote_date, lang } = { ...req.body };
        let params = {
            quote_date
        }
        let collection = devotions.getCollectionName(lang);

        let devotion = await devotionsModel.getDevotionById(req.db, params, collection);

        if (devotion.length > 0) {
            res.json({ status: true, data: devotion });
        } else {
            res.json({ status: false, msg: 'No data found!' });
        }

    },
    getDevotionByDates: async (req, res) => {
        const { quote_dates, lang } = { ...req.body };
        let params = {
            "quote_date": { $in: quote_dates }
        }
        let collection = devotions.getCollectionName(lang);
        let devotion = await devotionsModel.getDevotionById(req.db, params, collection);

        if (devotion.length > 0) {
            res.json({ status: true, data: devotion });
        } else {
            res.json({ status: false, msg: 'No data found!' });
        }
    },
    updateDevotion: async (req, res) => {
        const { topic, bible_verse, devotion, prayer, confession, quote_date, lang, _id } = { ...req.body };

        let params = {
            $set: {
                topic,
                bible_verse,
                devotion,
                prayer,
                confession,
                quote_date
            }
        }
        let where = {
            _id: new ObjectId(_id)
        }
        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        let update = await devotionsModel.updateDevotion(req.db, where, params, collection);
        if (update == true) {
            res.json({ status: true, msg: 'Devotion updated successfully!' })
        } else {
            res.json({ status: false, msg: 'Something Went Wrong!' });
        }
    },
    removeDevotion: async (req, res) => {
        const { lang, _id } = { ...req.body };
        let where = {
            _id: new ObjectId(_id)
        }
        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        let resp = await devotionsModel.removeDevotion(req.db, where, collection);

    },
    getVerse: async (req, res) => {
        const { verse } = { ...req.body };
        let params = {
            reference: verse
        }
        let verseData = await devotionsModel.getVerse(req.db, params);
        if (verseData.length > 0) {
            res.json({ success: true, data: verseData });
        } else {
            https.get('https://bible-api.com/' + verse, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    let where = {
                        reference: verse
                    };
                    let seData = JSON.parse(data);
                    let set = {
                        $set: {
                            seData
                        }
                    }
                    devotionsModel.updateVerse(req.db, where, set);
                    res.json({ status: true, data: JSON.parse(data) })
                });
            });
        }

    },
    getTestimonies: async (req, res) => {
        let testiData = await devotionsModel.getTestimonies(req.db);
        if (testiData.length > 0) {
            res.json({ success: true, data: testiData });
        } else {
            res.json({ status: false, msg: 'no data found!' });
        }
    },
    updateTestimonies: async (req, res) => {
        let update = await devotionsModel.updateTestimonies(req.db, req);
        if (update.result) {
            res.json({ status: true, msg: 'Updated Successfully!' });
        } else {
            res.json({ status: false, msg: 'Something Went Wrong!' });
        }
    },
    getConfession: async (req, res) => {
        let confData = await devotionsModel.getConfession(req.db);
        if (confData.length > 0) {
            res.json({ success: true, data: confData });
        } else {
            res.json({ status: false, msg: 'no data found!' });
        }
    },
    updateConfession: async (req, res) => {
        let update = await devotionsModel.updateConfession(req.db, req);
        if (update.result) {
            res.json({ status: true, msg: 'Updated Successfully!' });
        } else {
            res.json({ status: false, msg: 'Something Went Wrong!' });
        }
    },
    uploadImage: (req, res) => {
        asyncBusboy(req).then(async formData => {
            aws.config.setPromisesDependency();
            aws.config.update({
                AWSAccessKeyId: 'AKIAJHYNVES6AKXTKJQA',
                AWSSecretKey: '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'
                //region: process.env.REGION
            });
            const s3 = new aws.S3();
            var params = {
                ACL: 'public-read',
                Bucket: 'dyd-coza',
                Body: fs.createReadStream(req.file.path),
                Key: `userAvatar/${req.file.originalname}`
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    console.log('Error occured while trying to upload to S3 bucket', err);
                }

                if (data) {
                    fs.unlinkSync(req.file.path); // Empty temp folder
                    const locationUrl = data.Location;
                    let newUser = new Users({ ...req.body, avatar: locationUrl });
                    newUser
                        .save()
                        .then(user => {
                            res.json({ message: 'User created successfully', user });
                        })
                        .catch(err => {
                            console.log('Error occured while trying to save to DB');
                        });
                }
            });
        });

    },
    getCollectionName: (lang = '') => {
        let collection = 'devotions';
        if (lang == 'Spanish') {
            collection = 'devotionsSpanish';
        } else if (lang == 'French') {
            collection = 'devotionsFrench';
        } else if (lang == 'Hausa') {
            collection = 'devotionsHausa';
        } else if (lang == 'Yoruba') {
            collection = 'devotionsYoruba';
        } else if (lang == 'Igbo') {
            collection = 'devotionsIgbo';
        } else if (lang == 'Portuguese') {
            collection = 'devotionsPortuguese';
        } else if (lang == 'German') {
            collection = 'devotionsGerman';
        }

        return collection;
    }

}

module.exports = devotions;