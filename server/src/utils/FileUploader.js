
import { v2 as cloudinary } from "cloudinary";




class FileUploader {
    constructor() {
        cloudinary.config({
          cloud_name:'dnogpztwj',
          api_key: '999162136263525',
          api_secret:'b41hUXWGyiAkIH90FDBvZVa3ktc',
          secure: true,
          timeout: 60000
        });
    
        // Verify configuration
        console.log("Cloudinary initialized in constructor:", {
          cloud_name: cloudinary.config().cloud_name,
          api_key: cloudinary.config().api_key 
        });
      }
    
  async uploadFile(file) {
    try {
      if (!file?.buffer) {
        throw new Error("Invalid file format or missing buffer");
      }

      const fileString = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      const result = await cloudinary.uploader.upload(fileString, {
       
        resource_type: "auto",
      });

      return {
        url: result.secure_url,
        public_id: result.public_id,
        error: null
      };

    } catch (error) {
      console.error("File upload error:", error);
      return {
        url: null,
        public_id: null,
        error: error.message
      };
    }
  }

  async deleteFile(public_id, resourceType = "auto") {
    if (!public_id) {
      return { success: true, error: null };
    }

    try {
      const result = await cloudinary.uploader.destroy(public_id);

      if (result.result !== "ok") {
        throw new Error(`Deletion failed: ${result.result}`);
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Deletion Error:", error.message);
      return {
        success: false,
        error: "File may already be deleted or doesn't exist."
      };
    }
  }

}

export default new FileUploader();