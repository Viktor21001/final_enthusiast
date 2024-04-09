const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `${__dirname}/public/images`);
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, callback) => {
  if (types.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
