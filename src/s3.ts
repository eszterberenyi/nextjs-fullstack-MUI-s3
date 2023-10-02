import * as dotenv from 'dotenv';
import * as aws from 'aws-sdk';
import {Buffer} from "buffer";

dotenv.config()

const region = "eu-north-1"
const bucketName = "uxstudio-challenge-images"
const accessKeyId = process.env.AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_KEY as string;
export const awsUrl = 'https://uxstudio-challenge-images.s3.eu-north-1.amazonaws.com/'

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL(contactId : number) {

    const params = ({
      Bucket: bucketName,
      Key: contactId.toString(),
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

export async function uploadImageToBucket(binaryString : Buffer, contactId: number) {
    const params = ({
        Body: binaryString,
        Bucket: bucketName,
        Key: contactId.toString(),
    })

    try {
        const result = await s3.putObject(params).promise();
        console.log("Uploaded successfully:", result);
    } catch (error) {
        console.error("Error uploading:", error);
    }
    // return await s3.getSignedUrlPromise('putObject', params)
}
