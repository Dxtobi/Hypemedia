const multer = require('multer');
//const resize = require('../../utils/resize');

const storage = multer.diskStorage({
    destination:function  (req, file, cb) {
            cb(null, './upload/')
        },
    filename:function (req, file, cb) {
        cb(null , Date.now() + file.originalname.trim());
    },
})
const fileFilter = (req, file , cb)=>{
    //reject
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/gif' || file.mimetype === 'image/GIF'){
        cb( null, true)
    }else{
        cb(null, false)
        console.log('====================================');
        console.log('line 31 false : did not match : ' + file.mimetype);
        console.log('====================================');
    }
};
const upload = multer(
    {storage : storage,
     limits: {fileSize:1024*1024*10}, 
     fileFilter :fileFilter
    })


const pushImgs =(array)=>{
        //let x = array.length
        let newArray=[]
        let y = array.length
      
        for (let index = 0; index < array.length; index++) {

            newArray.push(array[index].path);
         y--
        }
         if(y === 0){
           return newArray
         }
}

const uploadFunctions = {
    pushImgs,
    upload
}
module.exports = uploadFunctions