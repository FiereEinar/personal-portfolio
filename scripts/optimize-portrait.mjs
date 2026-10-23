import sharp from "sharp";

await sharp("profile-crop.jpg")
  .resize(900, 1200, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/profile.jpg");
