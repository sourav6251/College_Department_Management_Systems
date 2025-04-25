import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Calendar,
    Clock,
    Users,
    MapPin,
    Trash2,
    FilePenLine,
} from "lucide-react";
import { parse, isToday, isFuture } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerDemo } from "@/components/layout/DatePicker";
import axios from "axios";
import { toast } from "sonner";
import axiosInstance from "../../api/axiosInstance";

const MeetingContent = ({
    id,
    title,
    description,
    date,
    time,
    participants,
    location,
    onDelete,
}) => {
    const [meetingData, setMeetingData] = useState({
        title,
        description,
        date,
        time,
        location,
    });

    // Parse date for status calculation
    const parseDate = (dateStr) => parse(dateStr, "dd-MM-yyyy", new Date());

    let status;
    let background;
    const meetingDate = parseDate(date);
    if (isToday(meetingDate)) {
        status = "Today";
        background = "bg-[#35c735]";
    } else if (isFuture(meetingDate)) {
        status = "Upcoming";
        background = "bg-[#1e87b8]";
    } else {
        status = "Completed";
        background = "bg-[#838586]";
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setMeetingData((prev) => ({ ...prev, [id]: value }));
    };

    // Handle edit form submission
    const submitEdit = async (e) => {
        e.preventDefault();
        const data = {
            title: meetingData.title,
            description: meetingData.description,
            meetingTime: `${meetingData.date}T${meetingData.time}:00Z`,
            meetingArea: meetingData.location,
        };

        try {
            await axiosInstance.patch(`/meeting/${id}`, data);
            toast.success("Meeting updated successfully!");
        } catch (error) {
            toast.error("Failed to update meeting: " + error.message);
        }
    };

    // Handle delete
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/meeting/${id}`);
            toast.success("Meeting deleted successfully!");
            onDelete(); // Refresh meetings
        } catch (error) {
            toast.error("Failed to delete meeting: " + error.message);
        }
    };

    return (
        <Card className="my-4 shadow-lg border border-gray-200 rounded-2xl transition hover:shadow-xl">
            <CardHeader className="rounded-t-2xl px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <CardTitle className="text-xl text-blue-800 flex flex-row">
                            <div className="w-full flex flex-row gap-4">
                                <div
                                    className={`px-2 rounded-full text-white text-[12px] font-normal shadow-sm ${background} flex items-center justify-center`}
                                >
                                    {status}
                                </div>
                                <div className="justify-center items-center">
                                    {title}
                                </div>
                            </div>
                        </CardTitle>
                    </div>
                    <div className="flex w-fit gap-3">
                        <Dialog>
                            <DialogTrigger className="justify-around items-center px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-700 transition flex gap-2">
                                Delete
                                <Trash2 className="p-1" />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Meeting</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this
                                        meeting? This action cannot be undone.
                                        <Button
                                            onClick={handleDelete}
                                            className="mt-4 bg-red-500 text-white"
                                        >
                                            Confirm Delete
                                        </Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger className="justify-around items-center px-4 py-2 text-sm bg-[#28449ede] text-white rounded-md hover:bg-[#28439e] transition flex gap-2">
                                Edit <FilePenLine className="p-1" />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Meeting</DialogTitle>
                                    <DialogDescription>
                                        <form
                                            //    rapidjson::Value::ConstMemberIterator itr = obj.FindMember("onSubmit");
                                            onSubmit={submitEdit}
                                            className="space-y-6 p-6 bg-white max-w-xl mx-auto"
                                        >
                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="title">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    value={meetingData.title}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter meeting title"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="description">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    value={
                                                        meetingData.description
                                                    }
                                                    onChange={handleInputChange}
                                                    placeholder="Meeting purpose, agenda..."
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    <Label htmlFor="date">
                                                        Date
                                                    </Label>
                                                    <DatePickerDemo
                                                        value={meetingData.date}
                                                        onChange={(value) =>
                                                            setMeetingData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    date: value,
                                                                })
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-1.5 w-full">
                                                    <Label htmlFor="time">
                                                        Time
                                                    </Label>
                                                    <Input
                                                        id="time"
                                                        type="time"
                                                        value={meetingData.time}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label htmlFor="location">
                                                    Location
                                                </Label>
                                                <Input
                                                    id="location"
                                                    value={meetingData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter room/building"
                                                />
                                            </div>

                                            <Button type="submit">Save</Button>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Sheet>
                            <SheetTrigger className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                View Details /Notify
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Meeting Details</SheetTitle>
                                    <SheetDescription>
                                        <p>
                                            <strong>Title:</strong>
                                            {title}
                                        </p>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {description}
                                        </p>
                                        <p>
                                            <strong>Date:</strong> {date}
                                        </p>
                                        <p>
                                            <strong>Time:</strong> {time}
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {location}
                                        </p>
                                        <p>
                                            <strong>Participants:</strong>{" "}
                                            {participants}
                                        </p>
                                        {/* Add notification logic here */}
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {description}
            </CardContent>

            <CardFooter className="flex justify-around px-6 py-[10px] rounded-b-2xl">
                <div className="flex flex-col items-center gap-[3px]">
                    <Calendar className="w-4 h-4" />
                    <div className="flex gap-2 items-center">
                        <p className="text-[13px]">Date</p>
                        <p className="text-[13px]">{date}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-[3px]">
                    <Clock className="w-4 h-4" />
                    <div className="flex gap-2 items-center">
                        <p className="text-[13px]">Time</p>
                        <p className="text-[13px]">{time}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-[3px]">
                    <Users className="w-4 h-4" />
                    <div className="flex gap-2 items-center">
                        <p className="text-[13px]">Participants</p>
                        <p className="text-[13px]">{participants}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-[3px]">
                    <MapPin className="w-4 h-4" />
                    <div className="flex gap-2 items-center">
                        <p className="text-[13px]">Location</p>
                        <p className="text-[13px]">{location}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default MeetingContent;
