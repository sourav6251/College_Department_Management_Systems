// import { Syllabus } from "../model/syllabus.model.js";

// class SyllabusService {
//     async createSyllabus(data) {
//         let syllabus ;
//         console.log('Enter  into syllabus ',data);
//         try{syllabus= await Syllabus.create(data);}
//         catch(error){
//             console.log("error=>",error);
            
//         }
//         console.log('Enter  into syllabus ',syllabus);
//         return syllabus;
//     }

//     async updateSyllabus(data, id) {
//         const syllabus = await Syllabus.findByIdAndUpdate(id, data, { new: true });
//         return syllabus;
//     }

//     // async showSyllabus({ department, semester, paperCode }) {
//     async showSyllabus(data) {
//         console.log(`data.departmentid skd=>`,data);
//         const department = data.department;
//         // const semester = data.semester;
//         // const paperCode = data.paperCode;
//         const filter = { department };
//         // if (semester) filter.semester = semester;
//         // if (paperCode) filter.paperCode = paperCode;
// let syllabus
//         try{ syllabus = await Syllabus.find({ department: data });}
//         catch(error){
//             console.log(error);
            
//         }
//         console.log(`syllabus skd=>${syllabus}`);
        

//         return syllabus || null;
//     }

//     async deleteSyllabus(id) {
//         const result = await Syllabus.findByIdAndDelete(id);
//         return result;
//     }
// }
// export default new SyllabusService();
import { Syllabus } from "../model/syllabus.model.js";
import FileUploader from "../utils/FileUploader.js";

class SyllabusService {
    async createSyllabus(data) {
        const { user, department, semester, paperCode,paperName, media } = data;

        console.log("Creating syllabus with data:", {
            user,
            department,
            semester,
            paperCode,
            media: media ? `File present (${media.size} bytes)` : "No file",
        });

        let mediaInfo = null;

        try {
            if (media) {
                console.log("Starting file upload...");
                const uploadResult = await FileUploader.uploadFile(media);

                if (uploadResult.error) {
                    console.error("Upload failed:", uploadResult.error);
                    throw new Error(`File upload failed: ${uploadResult.error}`);
                }

                mediaInfo = {
                    mediaUrl: uploadResult.url,
                    public_id: uploadResult.public_id,
                };
                console.log("File uploaded successfully:", mediaInfo);
            }

            const syllabus = await Syllabus.create({
                user,
                department,
                semester,
                paperCode,
                paperName,
                media: mediaInfo ? [mediaInfo] : [],
            });

            console.log("Syllabus created successfully:", syllabus);
            return syllabus;
        } catch (error) {
            console.error("Error in createSyllabus:", error);
            throw error;
        }
    }

    async updateSyllabus(id, data) {
        const { semester, paperCode,paperName, media } = data;

        console.log("Updating syllabus with data:", {
            id,
            semester,
            paperCode,
            paperName,
            media: media ? `File present (${media.size} bytes)` : "No file",
        });

        try {
            // Find the existing syllabus
            const existingSyllabus = await Syllabus.findById(id);
            if (!existingSyllabus) {
                throw new Error("Syllabus not found");
            }

            let mediaArray = existingSyllabus.media || [];

            // Handle file upload if a new file is provided
            if (media) {
                console.log("Starting file upload...");
                const uploadResult = await FileUploader.uploadFile(media);

                if (uploadResult.error) {
                    console.error("Upload failed:", uploadResult.error);
                    throw new Error(`File upload failed: ${uploadResult.error}`);
                }

                // Delete old media from Cloudinary if it exists
                if (mediaArray.length > 0 && mediaArray[0].public_id) {
                    console.log("Deleting old media:", mediaArray[0].public_id);
                    const deleteResult = await FileUploader.deleteFile(mediaArray[0].public_id);
                    if (!deleteResult.success) {
                        console.warn("Failed to delete old media:", deleteResult.error);
                    }
                }

                // Update media array with new file
                mediaArray = [
                    {
                        mediaUrl: uploadResult.url,
                        public_id: uploadResult.public_id,
                    },
                ];
                console.log("File uploaded successfully:", mediaArray);
            }

            // Update syllabus in database
            const updatedSyllabus = await Syllabus.findByIdAndUpdate(
                id,
                {
                    semester,
                    paperCode,
                    paperName,
                    media: mediaArray,
                },
                { new: true, runValidators: true }
            );

            if (!updatedSyllabus) {
                throw new Error("Failed to update syllabus");
            }

            console.log("Syllabus updated successfully:", updatedSyllabus);
            return updatedSyllabus;
        } catch (error) {
            console.error("Error in updateSyllabus:", error);
            throw error;
        }
    }

    async showSyllabus(departmentId) {
        console.log("Fetching syllabus for department:", departmentId);

        try {
            const syllabus = await Syllabus.find({ department: departmentId });
            console.log("Syllabus fetched:", syllabus);
            return syllabus || [];
        } catch (error) {
            console.error("Error in showSyllabus:", error);
            throw error;
        }
    }

    async deleteSyllabus(id) {
        try {
            const syllabus = await Syllabus.findByIdAndDelete(id);
            if (!syllabus) {
                throw new Error("Syllabus not found");
            }

            console.log("Syllabus deleted:", syllabus);

            // Delete associated media from Cloudinary
            if (syllabus.media && syllabus.media.length > 0 && syllabus.media[0].public_id) {
                console.log("Deleting media:", syllabus.media[0].public_id);
                const deleteResult = await FileUploader.deleteFile(syllabus.media[0].public_id);
                console.log("Cloudinary delete result:", deleteResult);
            }

            return syllabus;
        } catch (error) {
            console.error("Error in deleteSyllabus:", error);
            throw error;
        }
    }
}

export default new SyllabusService();