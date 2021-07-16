const uuid = require("uuid");

const region = "us-east-2"; //TODO: Update

const AWS = require('aws-sdk');
const router = require('express').Router();

//AWS CONFIG
AWS.config.update({ region: region });

const S3_BUCKET = "squaredchat";
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_AKI,
    secretAccessKey: process.env.AWS_SAK,
    region: region,
    signatureVersion: "v4",
    //   useAccelerateEndpoint: true
});

const getPresignedUrl = (req, res) => {
    let fileType = req.body.fileType;
    if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg") {
        return res
            .status(403)
            .json({ success: false, message: "Image format invalid" });
    }

    fileType = fileType.substring(1, fileType.length);

    const fileName = uuid.v4();
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName + "." + fileType,
        Expires: 60 * 60,
        ContentType: "image/" + fileType,
        ACL: "public-read",
    };

    s3.getSignedUrl("putObject", s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            success: true,
            message: "Url generated",
            uploadUrl: data,
            downloadUrl: `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${fileName}` + "." + fileType,
        };
        return res.status(201).json(returnData);
    });
};

router.post("/uploadUserImage", (req, res) => getPresignedUrl(req, res));

module.exports = router;