import multer from "multer";
//import {uuidv4} from "uuid";
//import {path} from "path";
import path from "path";

let d = new Date();
const curr_date =  d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"./public/uploads");
    },
    filename: function (req,file,cb){
        cb(null, curr_date+`${path.basename(file.originalname)}`);
    },
});

const fileFilter = (req,file,cb)=>{
    const allowedFileTypes = ["image/jpg", "image/png", "image/jpeg"]
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const uploadMiddleware = multer({storage, fileFilter})

export default uploadMiddleware;