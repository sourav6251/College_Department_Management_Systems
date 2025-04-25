import React from "react";
import SyllabusContent from "../components/syllabus/SyllabusContent";
import { motion } from "framer-motion";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
// import { Helmet } from 'react-helmet';
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { useAuthStore } from "../store/authStore";

// Framer Motion Variants
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

const Syllabus = () => {

    const role:String | null=useAuthStore((state)=>state.role)
    return (
        <>
            {/* <Helmet>
                <title>Syllabus | PBC Online</title>
            </Helmet> */}

            {/* Header with button */}
            <motion.div
                className="flex items-center justify-between px-8 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-3xl font-bold">Syllabus</h1>
                {(role==='admin' ||role==='hod') && 
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">+ Add Syllabus</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>ADD new Syllabus</DialogTitle>
                            <DialogDescription>
                                <form className="mt-6 flex flex-col gap-5 py-3">
                                    <div className="w-full flex gap-4">
                                        <div className="w-1/2">
                                            <Label htmlFor="role">Semester</Label>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Semester" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[...Array(8)].map((_, i) => (
                                                        <SelectItem key={i} value={`${i + 1}`}>
                                                            {`${i + 1}st Semester`.replace("1st", `${i + 1}th`).replace("11th", "11th").replace("12th", "12th").replace("13th", "13th")}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Paper Code</Label>
                                            <Input id="doc" type="text" />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="title">Paper Name</Label>
                                        <Input id="title" type="text" />
                                    </div>
                                    <div>
                                        <Label htmlFor="doc">Upload Syllabus</Label>
                                        <Input
                                            placeholder="Upload Syllabus"
                                            id="doc"
                                            type="file"
                                            className="h-[5rem] w-full rounded-md cursor-pointer"
                                        />
                                    </div>
                                    <Button variant="default" className="w-full bg-slate-900">
                                        Create
                                    </Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>}

            </motion.div>

            {/* Animate Syllabus Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={itemVariants}>
                    <SyllabusContent />
                </motion.div>
            </motion.div>
        </>
    );
};

export default Syllabus;



// import React, { useState } from "react";
// import SyllabusContent from "../components/syllabus/SyllabusContent";
// import { motion } from "framer-motion";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../components/ui/select";
// import { Button } from "../components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";

// const Syllabus = () => {
//     const [selectedSemester, setSelectedSemester] = useState("1");
//     const [syllabusData, setSyllabusData] = useState<{ [key: string]: any[] }>({
//         1: [],
//         2: [],
//         3: [],
//         4: [],
//         5: [],
//         6: [],
//         7: [],
//         8: [],
//     });

//     const handleAddSyllabus = (newSyllabus: any) => {
//         setSyllabusData((prev) => ({
//             ...prev,
//             [selectedSemester]: [...prev[selectedSemester], newSyllabus],
//         }));
//     };

//     return (
//         <>
//             <motion.div
//                 className="flex items-center justify-between px-8 py-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <h1 className="text-3xl font-bold">Syllabus</h1>

//                 <Dialog>
//                     <DialogTrigger>
//                         <Button variant="outline">+ Add Syllabus</Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>ADD New Syllabus</DialogTitle>
//                             <DialogDescription>
//                                 <AddSyllabusForm onSubmit={handleAddSyllabus} semester={selectedSemester} />
//                             </DialogDescription>
//                         </DialogHeader>
//                     </DialogContent>
//                 </Dialog>
//             </motion.div>

//             <div className="px-8 pb-4">
//                 <Select value={selectedSemester} onValueChange={setSelectedSemester}>
//                     <SelectTrigger className="w-48">
//                         <SelectValue placeholder="Select Semester" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {[...Array(8)].map((_, i) => (
//                             <SelectItem key={i} value={`${i + 1}`}>
//                                 Semester {i + 1}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//             </div>

//             <motion.div initial="hidden" animate="show">
//                 <SyllabusContent
//                     syllabusList={syllabusData[selectedSemester]}
//                     setSyllabusList={(updatedList: any[]) =>
//                         setSyllabusData((prev) => ({
//                             ...prev,
//                             [selectedSemester]: updatedList,
//                         }))
//                     }
//                 />
//             </motion.div>
//         </>
//     );
// };

// const AddSyllabusForm = ({ onSubmit, semester }: any) => {
//     const [code, setCode] = useState("");
//     const [name, setName] = useState("");

//     const handleSubmit = (e: any) => {
//         e.preventDefault();
//         onSubmit({ semester, papercode: code, papername: name });
//         setCode("");
//         setName("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
//             <Label>Paper Code</Label>
//             <Input value={code} onChange={(e) => setCode(e.target.value)} required />
//             <Label>Paper Name</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} required />
//             <Button type="submit" className="bg-slate-900 w-full">
//                 Add
//             </Button>
//         </form>
//     );
// };

// export default Syllabus;
