// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Plus } from "lucide-react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";

// const AddRoutineDialog = () => {
//     const [subject, setSubject] = useState("");
//     const [teacher, setTeacher] = useState("");
//     const [classType, setClassType] = useState("");
//     const [semester, setSemester] = useState("");
//     const [day, setDay] = useState("");
//     const [time, setTime] = useState("");

//     const handleAddRoutine = () => {
//         console.log("Routine Added:", {
//             subject,
//             teacher,
//             classType,
//             semester,
//             day,
//             time,
//         });

//         // Clear form after submit
//         setSubject("");
//         setTeacher("");
//         setClassType("");
//         setSemester("");
//         setDay("");
//         setTime("");
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="default" className="flex items-center gap-2">
//                     <Plus className="h-4 w-4" />
//                     Add routine
//                 </Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add Routine</DialogTitle>
//                     <DialogDescription>
//                         Fill in the routine details below.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="flex flex-col gap-4 py-4">
//                     <Input
//                         placeholder="Subject name"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                     />
//                     <Input
//                         placeholder="Teacher name"
//                         value={teacher}
//                         onChange={(e) => setTeacher(e.target.value)}
//                     />
//                     <Input
//                         placeholder="Type (Lab, Lecture, etc...)"
//                         value={classType}
//                         onChange={(e) => setClassType(e.target.value)}
//                     />

//                     {/* Semester selection */}
//                     <Select
//                         value={semester}
//                         onValueChange={(value) => setSemester(value)}
//                     >
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select Semester" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="1st">1st Semester</SelectItem>
//                             <SelectItem value="2nd">2nd Semester</SelectItem>
//                             <SelectItem value="3rd">3rd Semester</SelectItem>
//                             <SelectItem value="4th">4th Semester</SelectItem>
//                             <SelectItem value="5th">5th Semester</SelectItem>
//                             <SelectItem value="6th">6th Semester</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     {/* Day selection */}
//                     <Select
//                         value={day}
//                         onValueChange={(value) => setDay(value)}
//                     >
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select Day" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="monday">Monday</SelectItem>
//                             <SelectItem value="tuesday">Tuesday</SelectItem>
//                             <SelectItem value="wednesday">Wednesday</SelectItem>
//                             <SelectItem value="thursday">Thursday</SelectItem>
//                             <SelectItem value="friday">Friday</SelectItem>
//                             <SelectItem value="saturday">Saturday</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Input
//                         placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                     />

//                     <Button onClick={handleAddRoutine} className="w-full">
//                         Save Routine
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default AddRoutineDialog;
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
// import axios from "axios";

const AddRoutineDialog = ({ onRoutineAdded }) => {
    const [paperCode, setPaperCode] = useState("");
    const [professor, setProfessor] = useState("");
    const [classType, setClassType] = useState("");
    const [semester, setSemester] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const role = useAuthStore((state) => state.role);
    const userID = useAuthStore((state) => state.user._id);
    const departmentid = useAuthStore((state) => state.departmentid);

    const handleAddRoutine = async () => {
        setLoading(true);
        setError(null);

        try {
            // Assuming user, department, and semester IDs are available (e.g., from context or props)
            const userId = userID; // Replace with actual user ID
            const departmentId = departmentid; // Replace with actual department ID
            const semesterId = semester; // Use selected semester ID

            const routineData = {
                user: userId,
                department: departmentId,
                semester: semesterId,
                schedules: [
                    {
                        dayName: day,
                        timeSlots: [
                            {
                                paperCode,
                                professor, // Assuming professor is a user ID
                                startTime: new Date(`2025-01-01 ${startTime}`), // Adjust date as needed
                                endTime: new Date(`2025-01-01 ${endTime}`),
                            },
                        ],
                    },
                ],
            };

            const response = await axiosInstance.post("/routines", routineData);
            console.log("Routine Added:", response.data);

            // Clear form after submit
            setPaperCode("");
            setProfessor("");
            setClassType("");
            setSemester("");
            setDay("");
            setStartTime("");
            setEndTime("");

            // Notify parent component to refresh routines
            onRoutineAdded();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add routine");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add routine
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Routine</DialogTitle>
                    <DialogDescription>
                        Fill in the routine details below.
                    </DialogDescription>
                </DialogHeader>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="Paper Code (e.g., CS101)"
                        value={paperCode}
                        onChange={(e) => setPaperCode(e.target.value)}
                    />
                    <Input
                        placeholder="Professor ID"
                        value={professor}
                        onChange={(e) => setProfessor(e.target.value)}
                    />
                    <Input
                        placeholder="Type (Lab, Lecture, etc...)"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    />

                    {/* Semester selection */}
                    <Select
                        value={semester}
                        onValueChange={(value) => setSemester(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SEMESTER_ID_1">1st Semester</SelectItem>
                            <SelectItem value="SEMESTER_ID_2">2nd Semester</SelectItem>
                            <SelectItem value="SEMESTER_ID_3">3rd Semester</SelectItem>
                            <SelectItem value="SEMESTER_ID_4">4th Semester</SelectItem>
                            <SelectItem value="SEMESTER_ID_5">5th Semester</SelectItem>
                            <SelectItem value="SEMESTER_ID_6">6th Semester</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Day selection */}
                    <Select
                        value={day}
                        onValueChange={(value) => setDay(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        type="time"
                        placeholder="Start Time (e.g., 10:00)"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <Input
                        type="time"
                        placeholder="End Time (e.g., 11:00)"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />

                    <Button
                        onClick={handleAddRoutine}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Routine"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddRoutineDialog;