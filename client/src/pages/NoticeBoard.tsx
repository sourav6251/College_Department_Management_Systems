import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import NoticeContent from "../components/notices/NoticeContent";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
// import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import ApiFunction from "../service/ApiFunction";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/authStore";
import apiStore from "../api/apiStore";
// import axiosInstance from "../../api/axiosInstance"; // Assuming axiosInstance is configured
// import ApiFunction from "../utils/apiFunction"; // For Cloudinary upload

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const NoticeBoard = () => {
    const departmentID = useAuthStore((state) => state.departmentid);
    const role = useAuthStore((state) => state.role);
    const userId = useAuthStore((state) => state.user._id);
    console.log("departmentID", departmentID);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [notices, setNotices] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, file }));
    };

    const fetchNotices = async () => {
        try {
            const response = await apiStore.noticeboardGet(departmentID)
            setNotices(response.data.data || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch notices"
            );
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("user", userId);
            formDataToSend.append("department", departmentID);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            
            // if (formData.file) {
            //     if (formData.file !== "application/pdf") {
            //     // if (formData.file.type !== "application/pdf") {
            //         throw new Error("Only PDF files are allowed");
            //     }
                formDataToSend.append("media", formData.file); 
            // }
    
            const response = await apiStore.noticeboardCreate(formDataToSend);
            
            toast.success(response.data.message || "Notice created successfully");
            
            // Reset form
            setFormData({ title: "", description: "", file: null });
            // Refresh notices
            await fetchNotices();
        } catch (error) {
            console.error("Error creating notice:", error);
            toast.error(error.message || "Failed to create notice");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (departmentID) {
            fetchNotices();
        }
    }, [departmentID]);

    return (
        <div className="p-6 flex-col flex gap-4">
            <motion.div
                className="flex flex-row items-center justify-between pb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-2xl font-semibold">Notice Board</h1>
                {(role === "admin" || role === "hod") && (
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                variant="default"
                                className="flex flex-row items-center justify-center"
                            >
                                <Plus />
                                <span>Create Notice</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl w-full">
                            <DialogHeader>
                                <DialogTitle>Create a new notice</DialogTitle>
                                <DialogDescription>
                                    <form
                                        className="mt-6 flex flex-col gap-5"
                                        onSubmit={handleSubmit}
                                    >
                                        <div>
                                            <Label htmlFor="title">
                                                Notice title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Label htmlFor="description">
                                                Notice description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                rows={6}
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Label htmlFor="doc">
                                                Upload notice 
                                            </Label>
                                            <Input
                                                id="doc"
                                                type="file"
                                                // accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full bg-slate-900"
                                            disabled={loading}
                                        >
                                            {loading ? "Creating..." : "Create"}
                                        </Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </motion.div>

            <motion.div
                className="flex flex-col gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {notices.length === 0 ? (
                    <p>No notices found</p>
                ) : (
                    notices.map((notice) => (
                        <motion.div variants={itemVariants} key={notice._id}>
                            <NoticeContent notice={notice} />
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default NoticeBoard;
