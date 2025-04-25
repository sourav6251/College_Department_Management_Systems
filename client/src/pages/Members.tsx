// import React, { useEffect, useState } from "react";
// import MemberList from "../components/member/MemberList";

// import { motion } from "framer-motion";
// import AddMemberDialog from "../components/member/AddMemberDialog";

// import {
//     Select,
//     SelectTrigger,
//     SelectValue,
//     SelectContent,
//     SelectItem,
// } from "../components/ui/select";
// import axiosInstance from "../api/axiosInstance";
// import { useAuthStore } from "../store/authStore";
// import { Loader, Loader2 } from "lucide-react";

// // Animation variants
// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1,
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const Members = () => {
//     const [display, setDisplay] = useState("hod");

//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);

//     const { token } = useAuthStore();

//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             const response = await axiosInstance.post(
//                 "/user/get",
//                 { role: display },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setData(response.data.data);
//         } catch (error) {
//             console.log(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [display]);

//     return (
//         <>
//             <motion.div
//                 className="flex items-center justify-between px-8 py-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <h1 className="text-3xl font-bold">Members</h1>
//                 <div className="flex items-center gap-4">
//                     <Select
//                         value={display}
//                         onValueChange={(val) => setDisplay(val)}
//                     >
//                         <SelectTrigger className="w-[160px]">
//                             <SelectValue placeholder="Select Role" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="hod">HOD</SelectItem>
//                             <SelectItem value="faculty">Faculty</SelectItem>
//                             <SelectItem value="student">Student</SelectItem>
//                             <SelectItem value="external">External</SelectItem>
//                         </SelectContent>
//                     </Select>
//                     <AddMemberDialog />
//                 </div>
//             </motion.div>

//             {/* Content */}
//             {loading ? (
//                 <div className="w-full h-96 flex items-center justify-center">
//                     <Loader2 size={40} className="animate-spin" />
//                 </div>
//             ) : (
//                 <motion.div
//                     className="px-8"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     <motion.div variants={itemVariants}>
//                         <MemberList data={data} />
//                     </motion.div>
//                 </motion.div>
//             )}
//         </>
//     );
// };

// export default Members;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../components/ui/select";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/authStore";
import { Loader2 } from "lucide-react";
import MemberList from "../components/member/MemberList";
import AddMemberDialog from "../components/member/AddMemberDialog";
import { toast } from "sonner";

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

const Members = () => {
    const [display, setDisplay] = useState("hod");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const { token } = useAuthStore();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "/user/get",
                { role: display },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData(response.data.data);
            console.log(response);
        } catch (error) {
            toast.error("Failed to fetch members");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [display]);

    return (
        <>
            <motion.div
                className="flex items-center justify-between px-8 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-3xl font-bold">Members</h1>
                <div className="flex items-center gap-4">
                    <Select
                        value={display}
                        onValueChange={(val) => setDisplay(val)}
                    >
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hod">HOD</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="external">External</SelectItem>
                        </SelectContent>
                    </Select>
                    <AddMemberDialog />
                </div>
            </motion.div>

            {loading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <Loader2 size={40} className="animate-spin" />
                </div>
            ) : (
                <motion.div
                    className="px-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={itemVariants}>
                        <MemberList data={data} />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Members;