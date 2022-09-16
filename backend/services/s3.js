const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET
});

// const fileName = 'contacts.csv';

async  function uploadFile (fileName, key) {
    return  fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'appweb-grupo2-p1', // pass your bucket name
            Key: key, // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            return data.Location
        });
        return ""
    });

}

module.exports.uploadS3 = uploadFile
