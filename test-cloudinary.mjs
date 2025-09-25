import cloudinary from './cloudinary.mjs';
import fs from 'fs';

(async () => {
  try {
    const result = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg", {
      folder: "test_uploads"
    });
    console.log("✅ Upload gelukt:", result.secure_url);
  } catch (err) {
    console.error("❌ Upload fout:", err);
  }
})();
