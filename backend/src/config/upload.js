const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const path = require('path');
require('dotenv').config();

const storageS3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    defaultRegion: process.env.AWS_
})


const storageTypes = {
    local: multer.diskStorage({
            filename:  (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const name = path.basename(file.originalname, ext);
                file.key = name;

                cb(null, `${name}-${Date.now()}${ext}`);
            },
            destination: path.resolve(__dirname,'..', '..', 'uploads'),
        }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key:  (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    })
};


//Para deletar = 
/*
if(process.env.STORAGE_TYPE==='s3'){
    return s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: this.key
    })
}

*/
    


module.exports = {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else {
            cb(new Error("Invalid file tpe."));
        }
    }
}