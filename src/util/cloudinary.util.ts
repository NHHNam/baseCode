import {v2 as cloudinary} from 'cloudinary';

async function uploadFileToCloudinary(file: any){
    try {
        cloudinary.config({ 
            cloud_name: 'tienanh', 
            api_key: '513676653359691', 
            api_secret: 'TPdREjkSAiuIyXDl9xe-yGfPLlY' 
          });
      
        const uploadResult = await cloudinary.uploader.upload(file, {
          public_id: 'my-file',
          folder: 'post thumbnail',
        });
      
        return uploadResult.secure_url;
    } catch(err) {
        console.log(err)
    }
    
}
export default uploadFileToCloudinary