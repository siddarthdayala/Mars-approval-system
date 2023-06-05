import { Router } from "express";
import  uploadMiddleware  from "../middlewares/MulterMiddleware.js";
import UploadModel from "../models/UploadModel.js";


const router = Router();

router.get("/api/get", async (req,res)=>{
    const allPhotos = await UploadModel.find().sort({createdAt: "descending"});
    res.send(allPhotos);
})

router.post("/api/save", uploadMiddleware.single("photo"), (req,res) =>{
    const photo = req.file.filename; 
    console.log(photo);

    UploadModel.create({photo}).then((data)=>{
        console.log("Uploaded successfully..");
        console.log(data);
        res.send(data);
    })
    .catch((err) => console.log(err));
});

export default router; 