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
import { toast } from "sonner";
import axiosInstance from "../../api/axiosInstance";
import apiStore from "../../api/apiStore";

const MaillMeetingContent = ({
    id,
    title,
    description,
    date_time, // Expected: ISO string (e.g., "2025-05-23T03:10:00.000Z")
    participantsNo,
    participants,
    location,
    // onDelete,
}) => {
    console.log("date_time=> ", date_time);

    // Parse date_time into date (dd-MM-yyyy) and time (HH:mm)
    const parsedDateTime = new Date(date_time);
    const date = parsedDateTime
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .split("/")
        .join("-"); // e.g., "23-05-2025"
    const time = parsedDateTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }); // e.g., "03:10"

    // Initialize datetime for datetime-local input
    const initialDatetime = () => {
        try {
            return parsedDateTime.toISOString().slice(0, 16); // e.g., "2025-05-23T03:10"
        } catch {
            return "";
        }
    };

    const [meetingData, setMeetingData] = useState({
        title,
        description,
        datetime: initialDatetime(), // Combined date and time
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
            meetingTime: new Date(meetingData.datetime).toISOString(), // e.g., "2025-05-23T03:10:00.000Z"
            mettingArea: meetingData.location, // Match backend schema
        };

        try {
            console.log("Sending edit data:", data);
            await apiStore.meetingEdit(id,data)
            // await axiosInstance.patch(`/meeting/${id}`, data);
            toast.success("Meeting updated successfully!");
        } catch (error) {
            console.error(
                "submitEdit error:",
                error.response?.data || error.message
            );
            toast.error(
                "Failed to update meeting: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };
    const notify = async () => {
        // to = participants;
        let subject = `Reminder: ${title} scheduled on ${date} at ${time}`;
        console.log("participants=> ", participants);
        try {
            await apiStore.meetingMail(participants, title, subject);
            toast.success("mail send Successfully")
        } catch (error) {
            toast.error("Something Wrong")
            console.error(error)

        }
    };

    const handleDelete = async () => {
        try {
            await apiStore.meetingDelete(id)
            toast.success("Meeting deleted successfully!");
            onDelete();
        } catch (error) {
            console.error(
                "handleDelete error:",
                error.response?.data || error.message
            );
            toast.error(
                "Failed to delete meeting: " +
                    (error.response?.data?.message || error.message)
            );
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
                        <p className="text-[13px]">participantsNo</p>
                        <p className="text-[13px]">{participantsNo}</p>
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

export default MaillMeetingContent;
