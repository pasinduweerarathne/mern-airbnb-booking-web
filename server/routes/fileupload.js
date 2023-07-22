import express from "express";
import imageDownloader from "image-downloader";
// import { fileURLToPath } from "url";
// import path from "path";
import multer from "multer";
import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";

const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const parentDir = path.dirname(__dirname);

const bucket = "pasindu-airbnb-booking-app";

const uploadToS3 = async (path, originalFileName, mimetype) => {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const parts = originalFileName.split(".");
  const ext = parts[parts.length - 1];
  const newFileName = Date.now() + "." + ext;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFileName,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
};

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  const newname = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newname,
  });
  const url = await uploadToS3(
    "/tmp/" + newname,
    newname,
    mime.lookup("/tmp/" + newname)
  );
  res.json(url);
});

const photosMiddleware = multer({ dest: "/tmp" });
router.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
      // const extension = originalname.split(".")[1];
      // const newPath = `${path}.${extension}`;
      // fs.renameSync(path, newPath);
      // uploadedFiles.push(newPath.replace(/uploads\\/g, ""));
    }
    res.json(uploadedFiles);
  }
);

export default router;
