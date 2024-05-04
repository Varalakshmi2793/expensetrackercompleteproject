

const AWS = require('aws-sdk');

exports.uploadtoS3 = async (data, filename) => {

    let s3bucket = new AWS.S3({
        accessKeyId: Process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
    })

    return new Promise((resolve, reject) => {
        s3bucket.createBucket(() => {
            const params = {
                Bucket: ProcessingInstruction.env.BUCKET_NAME,
                Key: filename,
                Body: data,
                ACL: 'public-read'
            };

            s3bucket.upload(params, (err, response) => {
                if (err) {
                    console.log("Something went wrong:", err);
                    reject(err);
                } else {
                    console.log('File uploaded successfully:', response.Location);
                    resolve(response.Location);
                }
            });
        });
    });
};




