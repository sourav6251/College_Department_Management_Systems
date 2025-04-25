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
// import { Eye, EyeClosed, Loader2, Plus } from "lucide-react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";
// import axiosInstance from "../../api/axiosInstance";
// import { useAuthStore } from "../../store/authStore";

// const AddMemberDialog = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [role, setRole] = useState("");
//     const [dept, setDept] = useState("");
//     const [password, setPassword] = useState("");

//     const [loading, setLoading] = useState(false);

//     // const { token } = useAuthStore();

//     const handleAddMember = async () => {
//         try {
//             setLoading(true);
//             const response = await axiosInstance.post("/user/create", {
//                 email,
//                 name,
//                 role,
//                 password,
//             });
//             console.log(response);

//             // Clear form
//             setName("");
//             setEmail("");
//             setMobile("");
//             setRole("");
//             setPassword("");
//         } catch (error) {
//             console.log(error);
//             alert(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="default" className="flex items-center gap-2">
//                     <Plus className="h-4 w-4" />
//                     Add Member
//                 </Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add Member</DialogTitle>
//                     <DialogDescription>
//                         Fill in the member details below.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="flex flex-col gap-4 py-4">
//                     <Input
//                         placeholder="Full Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <Input
//                         placeholder="Email Address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <Input
//                         type="number"
//                         placeholder="Mobile no"
//                         value={mobile}
//                         onChange={(e) => setMobile(e.target.value)}
//                     />
//                     <div className="flex flex-col gap-y-2">
//                         <div className="border flex items-center rounded-md">
//                             <Input
//                                 id="password"
//                                 type={isVisible ? "text" : "password"}
//                                 placeholder="Password"
//                                 className="border-0 outline-none"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <Button
//                                 type="button"
//                                 className="bg-transparent"
//                                 variant="ghost"
//                                 onClick={() => setIsVisible(!isVisible)}
//                             >
//                                 {isVisible ? <Eye /> : <EyeClosed />}
//                             </Button>
//                         </div>
//                     </div>
//                     {/* Dept select  */}
//                     <Select
//                         value={dept}
//                         onValueChange={(value) => setDept(value)}
//                     >
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select Depertment" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="hod">
//                                 Computer Science
//                             </SelectItem>
//                             <SelectItem value="faculty">BCA</SelectItem>
//                             <SelectItem value="external">Geography</SelectItem>
//                             <SelectItem value="student">Student</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     {/* Role selection */}
//                     <Select
//                         value={role}
//                         onValueChange={(value) => setRole(value)}
//                     >
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select Role" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="hod">HOD</SelectItem>
//                             <SelectItem value="faculty">Faculty</SelectItem>
//                             <SelectItem value="external">External</SelectItem>
//                             <SelectItem value="student">Student</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Button
//                         onClick={handleAddMember}
//                         className="w-full"
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <Loader2 className="animate-spin" />
//                         ) : (
//                             "Save Member"
//                         )}
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default AddMemberDialog;
import React, { useState, useEffect } from "react";
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
import { Eye, EyeClosed, Loader2, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner"; // For user feedback

const AddMemberDialog = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState(""); // Role of the new user
    const [dept, setDept] = useState(""); // For existing department ID or new department name
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]); // Store fetched departments
    const [open, setOpen] = useState(false); // Control dialog open/close

    const { token } = useAuthStore(); // Get token for API calls

    // Fetch departments on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axiosInstance.get("/department/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDepartments(response.data.data || []);
            } catch (error) {
                toast.error("Failed to fetch departments");
            }
        };
        fetchDepartments();
    }, [token]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            let departmentId = dept;

            // If new user's role is HOD, create a new department
            if (role === "hod" && dept) {
                const deptData = {
                    name: dept,
                    capacity: 100, // Default value, adjust as needed
                    totalFaculty: 1, // Default value, adjust as needed
                    email: `${dept.toLowerCase().replace(/\s+/g, "")}@college.com`, // Generate email
                };
                const deptResponse = await axiosInstance.post("/department/", deptData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                departmentId = deptResponse.data.data._id;
            }

            // Create user payload
            const userData = {
                name,
                email,
                mobile,
                role,
                password,
                department: departmentId, // Include department ID
            };
console.log(userData);

            // Create user
            const response = await axiosInstance.post("/user/create", userData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Member added successfully!");
            setOpen(false); // Close dialog
            // Clear form
            setName("");
            setEmail("");
            setMobile("");
            setRole("");
            setDept("");
            setPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                    <DialogDescription>
                        Fill in the member details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="tel"
                        placeholder="Mobile no"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit mobile number"
                    />
                    <div className="flex flex-col gap-y-2">
                        <div className="border flex items-center rounded-md">
                            <Input
                                id="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="Password"
                                className="border-0 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <Button
                                type="button"
                                className="bg-transparent"
                                variant="ghost"
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye /> : <EyeClosed />}
                            </Button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <Select value={role} onValueChange={setRole} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hod">HOD</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="external">External</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Department Input: Conditional Rendering based on new user's role */}
                    {role === "hod" ? (
                        <Input
                            placeholder="New Department Name"
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            required
                        />
                    ) : (
                        <Select value={dept} onValueChange={setDept} required={role !== ""}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map((department) => (
                                    <SelectItem key={department._id} value={department._id}>
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading || !role || !dept}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Save Member"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;