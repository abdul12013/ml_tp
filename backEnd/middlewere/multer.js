const multer=require('multer')

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + '-' + file.originalname); // Ensure unique filename
        cb(null,file.originalname)
    }
})

const upload= multer({'storage':storage,
    // limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports=upload