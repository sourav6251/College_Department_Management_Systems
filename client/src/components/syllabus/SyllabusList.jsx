import { useState } from "react";
import { useSelector } from "react-redux";
import { Download, Pencil, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
};

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const initialSyllabi = [
    {
        id: 1,
        semester: 1,
        paperCode: "CS101",
        paperTitle: "Introduction to Programming",
        uploadDate: "2023-05-15",
        hasPdf: true,
    },
    // ... other syllabus items
];

const SyllabusList = () => {
    const role = useSelector((state) => state.user.role);
    const isHod = role === "hod";

    const [syllabi, setSyllabi] = useState(initialSyllabi);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [semesterFilter, setSemesterFilter] = useState("All Semesters");
    const [selectedSyllabusId, setSelectedSyllabusId] = useState(null);

    const filteredSyllabi = syllabi
        .filter(
            (s) =>
                semesterFilter === "All Semesters" ||
                s.semester.toString() ===
                    semesterFilter.replace("Semester ", "")
        )
        .filter(
            (s) =>
                searchTerm === "" ||
                s.paperCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.paperTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleDelete = (id) => {
        setSyllabi((prev) => prev.filter((s) => s.id !== id));
        alert("Syllabus has been deleted successfully");
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Table Card */}
            <Card className="w-full h-fit">
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-lg">Available Syllabi</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                className="pl-8"
                                placeholder="Search by code or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={semesterFilter}
                            onValueChange={setSemesterFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Semesters">
                                    All Semesters
                                </SelectItem>
                                {semesters.map((sem) => (
                                    <SelectItem
                                        key={sem}
                                        value={`Semester ${sem}`}
                                    >
                                        Semester {sem}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        {filteredSyllabi.length > 0 ? (
                           <table className="min-w-full text-sm">
                           <thead className="bg-red-200">
                               <tr className="bg-muted text-muted-foreground text-xs">
                                   <th className="text-left px-4 py-2">
                                       Semester
                                   </th>
                                   <th className="text-left px-4 py-2">
                                       Paper Code
                                   </th>
                                   <th className="text-left px-4 py-2">
                                       Paper Title
                                   </th>
                                   <th className="text-left px-4 py-2">
                                       Upload Date
                                   </th>
                                   <th className="text-center px-4 py-2 ">
                                       Actions
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               {filteredSyllabi.map((syllabus) => (
                                   <tr
                                       key={syllabus.id}
                                       className={`border-t cursor-pointer hover:bg-muted/50 ${
                                           selectedSyllabusId === syllabus.id
                                               ? "bg-muted/30"
                                               : ""
                                       }`}
                                       onClick={() =>
                                           setSelectedSyllabusId((prev) =>
                                               prev === syllabus.id ? null : syllabus.id
                                           )
                                       }
                                   >
                                       <td className="px-4 py-2">
                                           Semester {syllabus.semester}
                                       </td>
                                       <td className="px-4 py-2">
                                           {syllabus.paperCode}
                                       </td>
                                       <td className="px-4 py-2">
                                           {syllabus.paperTitle}
                                       </td>
                                       <td className="px-4 py-2">
                                           {formatDate(syllabus.uploadDate)}
                                       </td>
                                       <td className="px-4 py-2">
                                           <div className="flex gap-2 justify-start md:justify-center">
                                               <Button size="icon" variant="ghost" title="Download">
                                                   <Download className="w-4 h-4" />
                                               </Button>
                                               {isHod && (
                                                   <>
                                                       <Button size="icon" variant="ghost" title="Edit">
                                                           <Pencil className="w-4 h-4" />
                                                       </Button>
                                                       <Button
                                                           size="icon"
                                                           variant="ghost"
                                                           title="Delete"
                                                           onClick={(e) => {
                                                               e.stopPropagation();
                                                               handleDelete(syllabus.id);
                                                           }}
                                                           className="text-red-500 hover:text-red-700"
                                                       >
                                                           <Trash2 className="w-4 h-4" />
                                                       </Button>
                                                   </>
                                               )}
                                           </div>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                       
                        ) : (
                            <p className="text-center py-6 text-muted-foreground">
                                No syllabi found matching your criteria
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Side Panel */}
            {selectedSyllabusId && (
                <div className="w-full lg:max-w-sm border p-4 rounded-md bg-muted text-sm h-fit">
                    <h3 className="font-semibold mb-2">Syllabus Details</h3>
                    {(() => {
                        const selected = syllabi.find(
                            (s) => s.id === selectedSyllabusId
                        );
                        if (!selected) return null;

                        return <div className="h-[20rem]">Syllabus</div>;
                    })()}
                </div>
            )}
        </div>
    );
};

export default SyllabusList;
