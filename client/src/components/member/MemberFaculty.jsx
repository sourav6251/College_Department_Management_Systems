// import React, { useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// const MemberFaculty = () => {
//     const [search, setSearch] = useState("");

//     const faculty = [
//         {
//             depertment: "CS",
//             name: "Animesh Sinha",
//             phone: "123456789",
//             email: "animesh@college.com",
//         },
//         {
//             depertment: "CS",
//             name: "Rituparna Ma'am",
//             phone: "123456789",
//             email: "rituparna@college.com",
//         },
//         {
//             depertment: "CS",
//             name: "Kaushik Sir",
//             phone: "123456789",
//             email: "kaushik@college.com",
//         },
//         {
//             depertment: "CS",
//             name: "Sneha Ma'am",
//             phone: "123456789",
//             email: "sneha@college.com",
//         },
//         {
//             depertment: "CS",
//             name: "Sourav Das",
//             phone: "123456789",
//             email: "sourav@college.com",
//         },
//     ];

//     const filteredFaculty = faculty.filter((f) =>
//         f.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <>
//             <div className="w-full h-fit mr-2 border-gray-300 border-[1px] rounded-lg p-4">
//                 {/* Search Input */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search faculty by name..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background"
//                     />
//                 </div>

//                 <Table>
//                     <TableCaption>List of all Faculty</TableCaption>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead className="w-1/4 text-center">Name</TableHead>
//                             <TableHead className="w-1/4 text-center">Phone no</TableHead>
//                             <TableHead className="w-1/4 text-center">Email</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {filteredFaculty.length > 0 ? (
//                             filteredFaculty.map((items, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell className="text-center">{items.name}</TableCell>
//                                     <TableCell className="text-center">{items.phone}</TableCell>
//                                     <TableCell className="text-center">{items.email}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={3} className="text-center text-gray-400 italic">
//                                     No matching faculty found.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </>
//     );
// };

// export default MemberFaculty;
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const MemberFaculty = () => {
    const [search, setSearch] = useState("");
    const [faculty, setFaculty] = useState([]);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axiosInstance.post(
                    "/user/get",
                    { role: "faculty" },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFaculty(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch faculty");
            }
        };
        fetchFaculty();
    }, [token]);

    const filteredFaculty = faculty.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-fit mr-2 border-gray-300 border-[1px] rounded-lg p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search faculty by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background"
                />
            </div>

            <Table>
                <TableCaption>List of all Faculty</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 text-center">Department</TableHead>
                        <TableHead className="w-1/4 text-center">Name</TableHead>
                        <TableHead className="w-1/4 text-center">Phone no</TableHead>
                        <TableHead className="w-1/4 text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredFaculty.length > 0 ? (
                        filteredFaculty.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{item.department?.name || "—"}</TableCell>
                                <TableCell className="text-center">{item.name}</TableCell>
                                <TableCell className="text-center">{item.mobile || "—"}</TableCell>
                                <TableCell className="text-center">{item.email}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400 italic">
                                No matching faculty found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MemberFaculty;