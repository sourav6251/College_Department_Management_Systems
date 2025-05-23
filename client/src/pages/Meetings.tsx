
// import React, { useEffect, useState } from "react";
// import MeetingContent from "../components/meeting/MeetingContent";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";
// import { motion } from "framer-motion";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Label } from "../components/ui/label";
// import { Textarea } from "../components/ui/textarea";
// import { CalendarPlus } from "lucide-react";
// import { DatePickerDemo } from "../components/layout/DatePicker";
// import { toast } from "sonner";
// import axiosInstance from "../api/axiosInstance";
// import { useAuthStore } from "../store/authStore";

// // Animation variants for Framer Motion
// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
// };

// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1,
//         },
//     },
// };

// const Meetings = () => {
//     const [meetings, setMeetings] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         date: "",
//         time: "",
//         location: "",
//         email: "",
//     });

//     const departmentid = useAuthStore((state) => state.departmentid);
//     const role = useAuthStore((state) => state.role);
//     const userId = useAuthStore((state) => state.user._id);
//     const userEmail = useAuthStore((state) => state.user.email); // Assuming email is available

//     // Fetch meetings on component mount
//     const fetchMeetings = async () => {
//         setLoading(true);
//         try {
//             const response = await axiosInstance.get(`/meeting/${userId}`);
//             console.log(response);
            
//             setMeetings(response.data.data || []);
//             console.log("meetings",meetings);
            
//         } catch (error) {
//             toast.error("Failed to fetch meetings: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (userEmail) {
//             fetchMeetings();
//         }
//     }, [userEmail]);

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     // Handle date picker change (assuming DatePickerDemo calls onChange with YYYY-MM-DD)
//     const handleDateChange = (value) => {
//         setFormData((prev) => ({ ...prev, date: value }));
//     };

//     // Handle form submission for creating a new meeting
//     const submitMeetingData = async (e) => {
//         e.preventDefault();
//         const { title, description, date, time, location, email } = formData;
// console.log("formData",formData);

//         // Validate inputs
//         // if (!title || !description || !date || !time || !location || !email) {
//         //     toast.error("All fields are required.");
//         //     return;
//         // }

//         const isoString = new Date().toISOString();
//         // new Date(`${date}T${time}`).toISOString();
//         // if (isNaN(new Date(isoString).getTime())) {
//         //     toast.error("Invalid date or time format.");
//         //     return;
//         // }

//         const data = {
//             user: userId,
//             title,
//             description,
//             meetingTime: isoString, // ISO string for MongoDB Date
//             mettingArea: location,
//             joinusList: [email], // Support multiple emails in future
//         };

//         try {
//             console.log("data=>", data);
//             await axiosInstance.post("/meeting", data);
//             toast.success("Meeting created successfully!");
//             setFormData({
//                 title: "",
//                 description: "",
//                 date: "",
//                 time: "",
//                 location: "",
//                 email: "",
//             }); // Reset form
//             fetchMeetings(); // Refresh meetings
//         } catch (error) {
//             toast.error("Failed to create meeting: " + error.message);
//         }
//     };

//     return (
//         <>
//             <div className="h-[2.7rem] pr-8 flex justify-end items-end">
        
//             {(role ==='hod') && 
//                 <Dialog>
//                     <DialogTrigger>
//                         <Button
//                             variant="outline"
//                             className="flex flex-row items-center justify-center"
//                         >
//                             <CalendarPlus className="text-[5px] p-[2px]" />
//                             <span>Organize meeting</span>
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Organize new meeting</DialogTitle>
//                             <DialogDescription className="gap-4 flex flex-col">
//                                 <form
//                                     onSubmit={submitMeetingData}
//                                     className="space-y-6 p-6 bg-white max-w-xl mx-auto"
//                                 >
//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="title">Title</Label>
//                                         <Input
//                                             id="title"
//                                             name="title"
//                                             value={formData.title}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter meeting title"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="description">
//                                             Description
//                                         </Label>
//                                         <Textarea
//                                             id="description"
//                                             name="description"
//                                             value={formData.description}
//                                             onChange={handleInputChange}
//                                             placeholder="Meeting purpose, agenda..."
//                                             required
//                                         />
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row gap-4">
//                                         <div className="flex flex-col gap-1.5 w-full">
//                                             <Label htmlFor="date">Date</Label>
//                                             <DatePickerDemo
//                                                 value={formData.date}
//                                                 onChange={handleDateChange}
//                                             />
//                                         </div>

//                                         <div className="flex flex-col gap-1.5 w-full">
//                                             <Label htmlFor="time">Time</Label>
//                                             <Input
//                                                 id="time"
//                                                 name="time"
//                                                 type="time"
//                                                 value={formData.time}
//                                                 onChange={handleInputChange}
//                                                 className="w-full"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="location">
//                                             Location
//                                         </Label>
//                                         <Input
//                                             id="location"
//                                             name="location"
//                                             value={formData.location}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter room/building"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="email">
//                                             User email
//                                         </Label>
//                                         <Input
//                                             id="email"
//                                             name="email"
//                                             type="email"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             placeholder="Email"
//                                             required
//                                         />
//                                     </div>

//                                     <Button type="submit">Submit</Button>
//                                 </form>
//                             </DialogDescription>
//                         </DialogHeader>
//                     </DialogContent>
//                 </Dialog>
// }
//             </div>

//             {loading ? (
//                 <div className="text-center">Loading meetings...</div>
//             ) : meetings.length === 0 ? (
//                 <div className="text-center">No meetings found.</div>
//             ) : (
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     {meetings.map((meeting, index) => (
//                         <motion.div key={meeting._id} variants={itemVariants}>
//                             <MeetingContent
//                                 id={meeting._id}
//                                 title={meeting.title}
//                                 description={meeting.description}
//                                 date={new Date(meeting.meetingTime)
//                                     .toLocaleDateString("en-GB")
//                                     .split("/")
//                                     .join("-")}
//                                 time={new Date(meeting.meetingTime).toLocaleTimeString([], {
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                 })}
//                                 participants={meeting.joinusList.length}
//                                 location={meeting.mettingArea}
//                                 onDelete={fetchMeetings} // Pass refresh function
//                             />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </>
//     );
// };

// export default Meetings;import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/authStore";
import Select from "react-select";
import apiStore from "../api/apiStore";
import MaillMeetingContent from "../components/meeting/MaillMeetingContent";

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
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        datetime: "", // Combined date and time
        location: "",
        selectedUsers: [],
        manualEmails: "",
    });
    const [ownMeetings, setOwnMeetings] = useState([]);
    const [invitedMeetings, setInvitedMeetings] = useState([]);
    
    const departmentid = useAuthStore((state) => state.departmentid);
    const role = useAuthStore((state) => state.role);
    const userId = useAuthStore((state) => state.user._id);
    const userEmail = useAuthStore((state) => state.userEmail);
    console.log("Mee userEmail=>",userEmail);
    

    // Fetch meetings
    // const fetchMeetings = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await apiStore.meetingGet(userId)
    //         const response2 = await apiStore.meetingGetByEmail(userEmail)
    //         console.log("fetchMeetings response:", response.data);
    //         console.log("fetchMeetings response2:", response2.data);
    //         setMeetings(response.data.data || []);
    //     } catch (error) {
    //         console.error("fetchMeetings error:", error.response?.data || error.message);
    //         toast.error("Failed to fetch meetings: " + (error.response?.data?.message || error.message));
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchMeetings = async () => {
        setLoading(true);
        try {
            const response = await apiStore.meetingGet(userId);
            const response2 = await apiStore.meetingGetByEmail(userEmail);
    
            console.log("fetchMeetings own:", response.data);
            console.log("fetchMeetings invited:", response2.data);
    
            setOwnMeetings(response.data.data || []);
            setInvitedMeetings(response2.data.data || []);
        } catch (error) {
            console.error("fetchMeetings error:", error.response?.data || error.message);
            toast.error("Failed to fetch meetings: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };
    
    // Fetch users with roles hod, faculty, external
    const fetchUsers = async () => {
        try {
            console.log("Fetching users for role:", role);
            const response = await apiStore.userGetByRole();
            
            console.log("userGetByRole response:", response.data);
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("fetchUsers error:", error.response?.data || error.message);
            toast.error("Failed to fetch users: " + (error.response?.data?.message || error.message));
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

    // Handle datetime-local change
    const handleDateChange = (e) => {
        const value = e.target.value; // e.g., "2025-05-23T11:13"
        console.log("Selected datetime:", value);
        setFormData((prev) => ({ ...prev, datetime: value }));
    };

    // Handle user selection
    const handleUserSelect = (selectedOptions) => {
        setFormData((prev) => ({ ...prev, selectedUsers: selectedOptions || [] }));
    };

    // Handle form submission
    const submitMeetingData = async (e) => {
        e.preventDefault();
        const { title, description, datetime, location, selectedUsers, manualEmails } = formData;

        // Validate inputs
        console.log("formData=> ", formData);
        if (!title || !description || !datetime || !location) {
            toast.error("All fields except emails are required.");
            return;
        }

        // Validate datetime
        const isoString = new Date(datetime).toISOString();
        console.log("Constructed ISO string:", isoString);
        if (isNaN(new Date(isoString).getTime())) {
            toast.error("Invalid date or time format.");
            return;
        }

        // Combine selected user emails and manual emails
        const userEmails = selectedUsers.map((user) => user.value);
        const manualEmailArray = manualEmails
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email);
        const joinusList = [...new Set([...userEmails, ...manualEmailArray])];

        if (joinusList.length === 0) {
            toast.error("At least one participant email is required.");
            return;
        }

        // Validate email formats
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        for (const email of joinusList) {
            if (!emailRegex.test(email)) {
                toast.error(`Invalid email address: ${email}`);
                return;
            }
        }

        const data = {
            user: userId,
            title,
            description,
            meetingTime: isoString,
            mettingArea: location,
            joinusList,
        };

        try {
            console.log("Sending data:", data);
            const response = await apiStore.meetingCreate(data);
            toast.success("Meeting created successfully!");
            setFormData({
                title: "",
                description: "",
                datetime: "",
                location: "",
                selectedUsers: [],
                manualEmails: "",
            });
            fetchMeetings();
        } catch (error) {
            console.error("submitMeetingData error:", error.response?.data || error.message);
            toast.error("Failed to create meeting: " + (error.response?.data?.message || error.message));
        }
    };

    // Options for react-select
    const userOptions = users.map((user) => ({
        value: user.email,
        label: `${user.name || user.email} (${user.role})`,
    }));

    return (
          <div className="container flex flex-col gap-4">
            <motion.div
                className="flex flex-row items-center justify-between pb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-2xl font-semibold">Meetings</h1>
                    <p>Manage and view department meetings</p>
                </div>
                {(role === "admin" || role === "hod") && (
                    <Dialog>
                        <DialogTrigger >
                            <Button
                                variant="default"
                                className="flex flex-row items-center justify-center gap-2"
                            >
                                <CalendarPlus className="w-4 h-4" />
                                <span>Organize meeting</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Organize new meeting</DialogTitle>
                                <DialogDescription className="gap-4 flex flex-col">
                                    <form
                                        onSubmit={submitMeetingData}
                                        className="p-6 bg-white max-w-3xl mx-auto"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Left Column: Invite Users and Manual Emails */}
                                            <div className="flex flex-col gap-4 w-full md:w-1/2">
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="users">Invite Users</Label>
                                                    <Select
                                                        isMulti
                                                        options={userOptions}
                                                        value={formData.selectedUsers}
                                                        onChange={handleUserSelect}
                                                        placeholder="Select users to invite..."
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="manualEmails">Manual Email(s)</Label>
                                                    <Input
                                                        id="manualEmails"
                                                        name="manualEmails"
                                                        value={formData.manualEmails}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter emails (comma-separated)"
                                                    />
                                                    <small className="text-gray-500">
                                                        Add unregistered users by entering their emails, separated by commas.
                                                    </small>
                                                </div>
                                            </div>
                                            {/* Right Column: Other Fields */}
                                            <div className="flex flex-col gap-4 w-full md:w-1/2">
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
                                                    <Label htmlFor="description">Description</Label>
                                                    <Textarea
                                                        id="description"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        placeholder="Meeting purpose, agenda..."
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="datetime">Date and Time</Label>
                                                    <Input
                                                        id="datetime"
                                                        name="datetime"
                                                        type="datetime-local"
                                                        value={formData.datetime}
                                                        onChange={handleDateChange}
                                                        className="w-full"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <Label htmlFor="location">Location</Label>
                                                    <Input
                                                        id="location"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter room/building"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full mt-6">
                                            Submit
                                        </Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </motion.div>
            {loading ? (
    <div className="text-center">Loading meetings...</div>
) : ownMeetings.length === 0 && invitedMeetings.length === 0 ? (
    <div className="text-center">No meetings found.</div>
) : (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
        {/* Meetings created by user */}
        {ownMeetings.map((meeting) => (
            <motion.div key={meeting._id} variants={itemVariants}>
                <MeetingContent
                    id={meeting._id}
                    title={meeting.title}
                    description={meeting.description}
                    date_time={meeting.mettingTime}
                    participantsNo={meeting.joinusList.length}
                    participants={meeting.joinusList}
                    location={meeting.mettingArea}
                    onDelete={fetchMeetings}
                />
            </motion.div>
        ))}

        {/* Meetings where user is invited */}
        {invitedMeetings.map((meeting) => (
            <motion.div key={meeting._id} variants={itemVariants}>
                <MaillMeetingContent
                    id={meeting._id}
                    title={meeting.title}
                    description={meeting.description}
                    date_time={meeting.mettingTime}
                    participantsNo={meeting.joinusList.length}
                    participants={meeting.joinusList}
                    location={meeting.mettingArea}
                />
            </motion.div>
        ))}
    </motion.div>
)}

        </div>
    );
};

export default Meetings;