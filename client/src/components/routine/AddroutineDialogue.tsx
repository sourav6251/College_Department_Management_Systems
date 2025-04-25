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

const AddRoutineDialog = () => {
    const [subject, setSubject] = useState("");
    const [teacher, setTeacher] = useState("");
    const [classType, setClassType] = useState("");
    const [semester, setSemester] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");

    const handleAddRoutine = () => {
        console.log("Routine Added:", {
            subject,
            teacher,
            classType,
            semester,
            day,
            time,
        });

        // Clear form after submit
        setSubject("");
        setTeacher("");
        setClassType("");
        setSemester("");
        setDay("");
        setTime("");
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

                <div className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="Subject name"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <Input
                        placeholder="Teacher name"
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
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
                            <SelectItem value="1st">1st Semester</SelectItem>
                            <SelectItem value="2nd">2nd Semester</SelectItem>
                            <SelectItem value="3rd">3rd Semester</SelectItem>
                            <SelectItem value="4th">4th Semester</SelectItem>
                            <SelectItem value="5th">5th Semester</SelectItem>
                            <SelectItem value="6th">6th Semester</SelectItem>
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
                        placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <Button onClick={handleAddRoutine} className="w-full">
                        Save Routine
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddRoutineDialog;
