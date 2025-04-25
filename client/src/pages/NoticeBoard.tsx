// import React from "react";

// import { Plus } from "lucide-react";
// import { motion } from "framer-motion";

// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Button } from "../components/ui/button";
// import { Textarea } from "../components/ui/textarea";
// import NoticeContent from "../components/notices/NoticeContent";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";
// import { useAuthStore } from "../store/authStore";

// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1, // controls delay between children
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const NoticeBoard = () => {

//     const role:String|null =useAuthStore((state)=>state.role)
//     return (
//         <>
//             <div className="p-6 flex-col flex gap-4">
//                 <motion.div
//                     className="flex flex-row items-center justify-between pb-2"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <h1 className="text-3xl font-bold">Notice Board</h1>
//                     {(role==='admin'|| role==='hod') && 
//                     <Dialog>
//                         <DialogTrigger>
//                             <Button
//                                 variant="outline"
//                                 className="flex flex-row items-center justify-center"
//                             >
//                                 <Plus />
//                                 <span>Create Notice</span>
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Create a new notice</DialogTitle>
//                                 <DialogDescription>
//                                     <form className="mt-6 flex flex-col gap-5">
//                                         <div>
//                                             <Label htmlFor="title">
//                                                 Notice title
//                                             </Label>
//                                             <Input id="title" type="text" />
//                                             <Label htmlFor="description">
//                                                 Notice description
//                                             </Label>
//                                             <Textarea
//                                                 id="description"
//                                                 rows={6}
//                                             />
//                                             <Label htmlFor="doc">
//                                                 Upload notice
//                                             </Label>
//                                             <Input
//                                                 id="doc"
//                                                 type="file"
//                                                 accept=".pdf"
//                                             />
//                                         </div>
//                                         <Button
//                                             variant={"default"}
//                                             className="w-full bg-slate-900"
//                                         >
//                                             Create
//                                         </Button>
//                                     </form>
//                                 </DialogDescription>
//                             </DialogHeader>
//                         </DialogContent>
//                     </Dialog> }
//                 </motion.div>

//                 <motion.div
//                     className="flex flex-col gap-3"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     {Array.from({ length: 10 }).map((_, index) => (
//                         <motion.div variants={itemVariants} key={index}>
//                             <NoticeContent />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </>
//     );
// };

// export default NoticeBoard;


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
    // const { role, userId, departmentID } = useAuthStore((state) => ({
    //     role: state.role,
    //     userId: state.user._id, // Assuming userId is stored in authStore
    //     departmentID: state.departmentid        ,
    // }));
    const departmentID =useAuthStore((state)=>state.departmentid)
    const role =useAuthStore((state)=>state.role)
    const userId =useAuthStore((state)=>state.user._id)
    console.log('departmentID',departmentID);
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [notices, setNotices] = useState([]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, file }));
    };

    // Fetch notices
    const fetchNotices = async () => {
        try {
            const response = await axiosInstance.get("/noticeboard", {
                params: { department: departmentID },
            });
            setNotices(response.data.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch notices");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
console.log('formData',formData);

        try {
            let media = [];
            if (formData.file) {
                // Upload file to Cloudinary
                const uploadResult = await ApiFunction.uploadCoudinary(formData.file);
                media = [
                    {
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id,
                        // type: uploadResult.format === "pdf" ? "pdf" : "image",
                    },
                ];
                console.log("media=>",media);
                
            }
            /**
            noticeData = {
                // _id: data._id,
                title: data.title,
                description: data.description,
                media: [
                    {
                        url: cloudinaryResponse.secure_url,
                        id: cloudinaryResponse.public_id,
                    },
                ],
                user: userid,
                department: departmentid,
                date: data.date,
 */
            // Prepare notice data
            const noticeData = {
                user: userId,//
                department: departmentID,//
                title: formData.title,//
                description: formData.description,//
                media,//
            };


            // Send POST request to create notice
            const response = await axiosInstance.post("/noticeboard", noticeData);
            toast.success(response.data.message || "Notice created successfully");

            // Reset form and refresh notices

            setFormData({ title: "", description: "", file: null });
            fetchNotices();
        } catch (error) {
            console.log('error',error);
            
            toast.error(error.response?.data?.message || "Failed to create notice");
        } finally {
            setLoading(false);
        }
    };

    // Load notices on mount
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
                <h1 className="text-3xl font-bold">Notice Board</h1>
                {(role === "admin" || role === "hod") && (
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                variant="outline"
                                className="flex flex-row items-center justify-center"
                            >
                                <Plus />
                                <span>Create Notice</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a new notice</DialogTitle>
                                <DialogDescription>
                                    <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
                                        <div>
                                            <Label htmlFor="title">Notice title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Label htmlFor="description">Notice description</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                rows={6}
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Label htmlFor="doc">Upload notice (PDF)</Label>
                                            <Input
                                                id="doc"
                                                type="file"
                                                accept=".pdf"
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