import { S3 } from "@aws-sdk/client-s3";
import { constants } from "src/constants";

interface ParamsMethods { key: string, img: Buffer, contentType: string }
type OnlyKey = Omit<ParamsMethods, "img" | "contentType">
export class Bucket {
    private s3: S3;
    constructor() {
        this.s3 = new S3({
            region: constants.regionAws,
            credentials: {
                accessKeyId: constants.bucketAccessKey,
                secretAccessKey: constants.bucketSecretKey
            }
        })
    }
    async pubObject({ key, img, contentType }: ParamsMethods) {
        return await this.s3.putObject({
            Bucket: constants.bucketName,
            Key: key,
            Body: img,
            ContentType: contentType

        })
    }
    async deleteObject({ key, }: OnlyKey) {
        return await this.s3.deleteObject({
            Bucket: constants.bucketName,
            Key: key,
        })
    }
    async getObject({ key }: OnlyKey) {
        return await this.s3.getObject({
            Bucket: constants.bucketName,
            Key: key,
        })
    }
}