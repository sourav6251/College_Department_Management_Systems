import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Plus } from "lucide-react";
import RoutineBox from "../components/routine/RoutineBox";
import AddRoutineDialog from "../components/routine/AddroutineDialogue";

const Routines = () => {
    const [semester, setSemester] = useState<string>("first");

    return (
        <section className="container flex flex-col gap-4">
            <header className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Routines</h1>
                    <p>Department</p>
                </div>
                <div className="flex flex-row gap-3 items-center justify-center">
                    <Select
                        value={semester}
                        onValueChange={(value) => setSemester(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="first">1st Sem</SelectItem>
                            <SelectItem value="second">2nd Sem</SelectItem>
                            <SelectItem value="third">3rd Sem</SelectItem>
                            <SelectItem value="fourth">4th Sem</SelectItem>
                            <SelectItem value="fifth">5th Sem</SelectItem>
                            <SelectItem value="sixth">6th Sem</SelectItem>
                            <SelectItem value="seventh">7th Sem</SelectItem>
                            <SelectItem value="eighth">8th Sem</SelectItem>
                        </SelectContent>
                    </Select>
                    <AddRoutineDialog />
                </div>
            </header>
            <div>
                <RoutineBox sem={semester} />
            </div>
        </section>
    );
};

export default Routines;
