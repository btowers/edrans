import config from '../config'
import aws from 'aws-sdk'

class Image {
  s3 = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION,
  })

  async deleteImages(filenames: Array<string>): Promise<aws.S3.DeleteObjectOutput> {
    const params = {
      Bucket: config.AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: filenames.map((file: any) => ({ Key: file })),
      },
    }
    return new Promise((resolve, reject) => {
      this.s3.deleteObjects(params, function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  async getPresignedUrl(fileName: string): Promise<string> {
    const s3Params = {
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Expires: 60 * 60,
    }
    return new Promise(async (resolve, reject) => {
      try {
        await this.s3.getSignedUrl('putObject', s3Params, function (err, data) {
          if (err) {
            return reject(err)
          }
          resolve(data)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }
}

export const S3 = new Image()
