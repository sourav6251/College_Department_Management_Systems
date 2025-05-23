
import React, { useEffect, useState } from "react";
import MeetingContent from "../components/meeting/MeetingContent";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { CalendarPlus } from "lucide-react";
import { DatePickerDemo } from "../components/layout/DatePicker";
import { toast } from "sonner";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/authStore";

// Animation variants for Framer Motion
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const Meetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        email: "",
    });

    const departmentid = useAuthStore((state) => state.departmentid);
    const role = useAuthStore((state) => state.role);
    const userId = useAuthStore((state) => state.user._id);
    const userEmail = useAuthStore((state) => state.user.email); // Assuming email is available

    // Fetch meetings on component mount
    const fetchMeetings = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/meeting/${userId}`);
            console.log(response);
            
            setMeetings(response.data.data || []);
            console.log("meetings",meetings);
            
        } catch (error) {
            toast.error("Failed to fetch meetings: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchMeetings();
        }
    }, [userEmail]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle date picker change (assuming DatePickerDemo calls onChange with YYYY-MM-DD)
    const handleDateChange = (value) => {
        setFormData((prev) => ({ ...prev, date: value }));
    };

    // Handle form submission for creating a new meeting
    const submitMeetingData = async (e) => {
        e.preventDefault();
        const { title, description, date, time, location, email } = formData;
console.log("formData",formData);

        // Validate inputs
        // if (!title || !description || !date || !time || !location || !email) {
        //     toast.error("All fields are required.");
        //     return;
        // }

        const isoString = new Date().toISOString();
        // new Date(`${date}T${time}`).toISOString();
        // if (isNaN(new Date(isoString).getTime())) {
        //     toast.error("Invalid date or time format.");
        //     return;
        // }

        const data = {
            user: userId,
            title,
            description,
            meetingTime: isoString, // ISO string for MongoDB Date
            mettingArea: location,
            joinusList: [email], // Support multiple emails in future
        };

        try {
            console.log("data=>", data);
            await axiosInstance.post("/meeting", data);
            toast.success("Meeting created successfully!");
            setFormData({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
                email: "",
            }); // Reset form
            fetchMeetings(); // Refresh meetings
        } catch (error) {
            toast.error("Failed to create meeting: " + error.message);
        }
    };

    return (
        <>
            <div className="h-[2.7rem] pr-8 flex justify-end items-end">
        
            {(role ==='hod') && 
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant="outline"
                            className="flex flex-row items-center justify-center"
                        >
                            <CalendarPlus className="text-[5px] p-[2px]" />
                            <span>Organize meeting</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Organize new meeting</DialogTitle>
                            <DialogDescription className="gap-4 flex flex-col">
                                <form
                                    onSubmit={submitMeetingData}
                                    className="space-y-6 p-6 bg-white max-w-xl mx-auto"
                                >
                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter meeting title"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Meeting purpose, agenda..."
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex flex-col gap-1.5 w-full">
                                            <Label htmlFor="date">Date</Label>
                                            <DatePickerDemo
                                                value={formData.date}
                                                onChange={handleDateChange}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5 w-full">
                                            <Label htmlFor="time">Time</Label>
                                            <Input
                                                id="time"
                                                name="time"
                                                type="time"
                                                value={formData.time}
                                                onChange={handleInputChange}
                                                className="w-full"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="Enter room/building"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="email">
                                            User email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    <Button type="submit">Submit</Button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
}
            </div>

            {loading ? (
                <div className="text-center">Loading meetings...</div>
            ) : meetings.length === 0 ? (
                <div className="text-center">No meetings found.</div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {meetings.map((meeting, index) => (
                        <motion.div key={meeting._id} variants={itemVariants}>
                            <MeetingContent
                                id={meeting._id}
                                title={meeting.title}
                                description={meeting.description}
                                date={new Date(meeting.meetingTime)
                                    .toLocaleDateString("en-GB")
                                    .split("/")
                                    .join("-")}
                                time={new Date(meeting.meetingTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                participants={meeting.joinusList.length}
                                location={meeting.mettingArea}
                                onDelete={fetchMeetings} // Pass refresh function
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
};

export default Meetings;
