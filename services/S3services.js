

const AWS = require('aws-sdk');

exports.uploadtoS3 = async (data, filename) => {
    const BUCKET_NAME= 'expensesupload';
    const IAM_USER_KEY='AKIA5FTZETITIESVRF5P';
    const IAM_USER_SECRET= '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';
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
            })
    
            return new Promise((resolve, reject) => {
                s3bucket.createBucket(() => {
                    const params = {
                        Bucket: BUCKET_NAME,
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
        

 
    
