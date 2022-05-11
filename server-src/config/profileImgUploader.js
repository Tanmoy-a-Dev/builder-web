const multer = require('multer');
const path = require('path');

const store = path.join(__dirname, "../../Images/avatars/")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, store)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" + "profileImage" + "-" + Date.now();
        cb(null, fileName + fileExt)
        req.imageName = fileName + fileExt
        // console.log(file)
        // console.log(req.body)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;