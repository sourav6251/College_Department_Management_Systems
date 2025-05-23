import { Noticeboard } from "../model/noticeboard.model.js";
import FileUploader from "../utils/FileUploader.js";

class NoticeboardService {
    async createNotice(data) {
        const { user, department, title, description, media } = data;

        console.log("Creating notice with data:", {
            user,
            department,
            title,
            description,
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
                    url: uploadResult.url,
                    public_id: uploadResult.public_id,
                };
                console.log("File uploaded successfully:", mediaInfo);
            }

            const notice = await Noticeboard.create({
                user,
                department,
                title,
                description,
                media: mediaInfo ? [mediaInfo] : [],
            });

            console.log("Notice created successfully:", notice);
            return notice;
        } catch (error) {
            console.error("Error in createNotice:", error);
            throw error;
        }
    }

    async showNotices(filterData) {
        const { user, department } = filterData;
        const filter = {};

        if (user) filter.user = user;
        if (department) filter.department = department;

        const notices = await Noticeboard.find(filter).select(
            "title description media createdAt"
        );

        return notices || [];
    }

    async updateNotice(id, data) {
        const { title, description, media } = data;

        console.log("Updating notice with data:", {
            id,
            title,
            description,
            media: media ? `File present (${media.size} bytes)` : "No file",
        });

        try {
            // Find the existing notice
            const existingNotice = await Noticeboard.findById(id);
            if (!existingNotice) {
                throw new Error("Notice not found");
            }

            let mediaArray = existingNotice.media || [];

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
                        url: uploadResult.url,
                        public_id: uploadResult.public_id,
                    },
                ];
                console.log("File uploaded successfully:", mediaArray);
            }

            // Update notice in database
            const updatedNotice = await Noticeboard.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    media: mediaArray,
                },
                { new: true, runValidators: true }
            );

            if (!updatedNotice) {
                throw new Error("Failed to update notice");
            }

            console.log("Notice updated successfully:", updatedNotice);
            return updatedNotice;
        } catch (error) {
            console.error("Error in updateNotice:", error);
            throw error;
        }
    }

    async deleteNotice(id) {
        try {
            const notice = await Noticeboard.findByIdAndDelete(id);
            if (!notice) {
                throw new Error("Notice not found");
            }

            console.log("Notice deleted:", notice);

            // Delete associated media from Cloudinary
            if (notice.media && notice.media.length > 0 && notice.media[0].public_id) {
                console.log("Deleting media:", notice.media[0].public_id);
                const deleteResult = await FileUploader.deleteFile(notice.media[0].public_id);
                console.log("Cloudinary delete result:", deleteResult);
            }

            return notice;
        } catch (error) {
            console.error("Error in deleteNotice:", error);
            throw error;
        }
    }
}

export default new NoticeboardService();

