const  cloudinary = require ("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinary.config({ 
    cloud_name: 'dkv7m0fbx', 
    api_key: '464776516344536', 
    api_secret: 'iRgtklNsEwEkbOlEfHEXm33TPF8' 
  });

  const storage = new CloudinaryStorage ({
    cloudinary,
  })

const upload = multer({
    storage,
})

module.exports = upload