import fs from 'fs';
import config from '../config';
import aws from 'aws-sdk';
import bluebird from 'bluebird';

/**
 * @class Image
 */
class Image {
  s3 = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION,
  });

  /**
   * @description Upload Image
   * @param {object} file
   * @return {any}
   */
  async saveImage(file: { path: string; filename: string }): Promise<string> {
    aws.config.setPromisesDependency(bluebird);

    const params = {
      ACL: 'public-read',
      Bucket: config.AWS_S3_BUCKET_NAME,
      Body: fs.createReadStream(file.path),
      Key: `${file.filename}`,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        fs.unlinkSync(file.path);
        resolve(data.key);
      });
    });
  }

  /**
   * @description Delete images
   * @param {array} filenames
   * @return {Promise}
   */
  async deleteImages(
    filenames: Array<string>
  ): Promise<aws.S3.DeleteObjectOutput> {
    const params = {
      Bucket: config.AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: filenames.map((file: any) => ({ Key: file })),
      },
    };
    return new Promise((resolve, reject) => {
      this.s3.deleteObjects(params, function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

export const imageS = new Image();
