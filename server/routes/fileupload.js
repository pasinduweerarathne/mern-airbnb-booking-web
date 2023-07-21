import express from "express";
import imageDownloader from "image-downloader";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.dirname(__dirname);

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  const newname = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: parentDir + "/uploads/" + newname,
  });
  res.json(newname);
});

const photosMiddleware = multer({ dest: "uploads" });
router.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const extension = originalname.split(".")[1];
      const newPath = `${path}.${extension}`;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(/uploads\\/g, ""));
    }
    res.json(uploadedFiles);
  }
);

export default router;
