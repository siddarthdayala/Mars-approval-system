import { mongoose } from "mongoose";



const uploadSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    }
}, {timestamps: true}
);

const UploadModel = mongoose.model("upload", uploadSchema); 
export default UploadModel;


