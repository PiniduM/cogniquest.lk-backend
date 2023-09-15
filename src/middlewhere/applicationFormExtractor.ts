import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/temp/application_forms/')
    },
    filename: function (req, file, cb) {
        const data = req.body;
        console.log(data);
        const competition_title = data.competition_title as string;
      cb(null, `${competition_title} Application Form`)
    }
  })
  
const upload = multer({ storage: storage });

export const applicationFormExtractor =   upload.single("application_form")