import { useState } from "react";
import { Link } from "react-router-dom";
import { User, UserCheck, Award, CalendarCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeachingSchedule from "./TeachingSchedule";

const DashboardHOD = () => {
    const [shrinkView, setShrinkView] = useState("");

    const viewSchedule = (id) => {
        setShrinkView((prevId) => (prevId === id ? "" : id));
    };

    const syllabus = [
        {
          id: 1,
          semester: 1,
          paperCode: "CS101",
          paperTitle: "Introduction to Programming",
          uploadDate: "2023-05-15",
          hasPdf: true,
        },
        {
          id: 2,
          semester: 1,
          paperCode: "CS102",
          paperTitle: "Computer Organization",
          uploadDate: "2023-05-15",
          hasPdf: true,
        },
        {
          id: 3,
          semester: 2,
          paperCode: "CS201",
          paperTitle: "Data Structures",
          uploadDate: "2023-05-14",
          hasPdf: true,
        },
        {
          id: 4,
          semester: 3,
          paperCode: "CS301",
          paperTitle: "Algorithm Design",
          uploadDate: "2023-05-12",
          hasPdf: true,
        },
        {
          id: 5,
          semester: 4,
          paperCode: "CS401",
          paperTitle: "Database Management Systems",
          uploadDate: "2023-05-10",
          hasPdf: true,
        },
      ];
    const stats = {
        facultyCount: 24,
        studentCount: 312,
        certificateRequestsCount: 3,
        upcomingMeetingsCount: 5,
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <CardDescription>Welcome back, Admin HOD</CardDescription>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    icon={<User className="text-blue-500 w-6 h-6" />}
                    title="Faculty Members"
                    value={stats.facultyCount}
                />
                <StatCard
                    icon={<UserCheck className="text-green-500 w-6 h-6" />}
                    title="Students"
                    value={stats.studentCount}
                />
                <StatCard
                    icon={<Award className="text-red-500 w-6 h-6" />}
                    title="Certificate Requests"
                    value={stats.certificateRequestsCount}
                />
                <StatCard
                    icon={<CalendarCheck className="text-yellow-500 w-6 h-6" />}
                    title="Upcoming Meetings"
                    value={stats.upcomingMeetingsCount}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <TeachingSchedule
                    syllabus={syllabus.slice(0, 3)}
                    shrinkView={shrinkView}
                    viewSchedule={viewSchedule}
                />
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-full mr-4 bg-muted">{icon}</div>
            <div>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl">{value}</CardTitle>
            </div>
        </CardContent>
    </Card>
);

// const TeachingSchedule = ({ syllabus, shrinkView, viewSchedule }) => {
//     return (
//         <Card className="w-full hover:shadow-md transition-shadow">
//             <CardHeader className="flex flex-row justify-between items-center pb-2">
//                 <CardTitle>Your Teaching Schedule</CardTitle>
//                 <Button variant="link" className="p-0 h-auto" asChild>
//                     <Link to="/syllabus">View All Courses</Link>
//                 </Button>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//                 {syllabus.map((item) => (
//                     <div
//                         key={item.id}
//                         onClick={() => viewSchedule(item.id)}
//                         className="p-4 rounded-lg bg-muted/50 hover:bg-accent cursor-pointer transition-colors"
//                     >
//                         <div className="flex justify-between items-start mb-2">
//                             <div>
//                                 <h3 className="font-medium">{item.paperTitle}</h3>
//                                 <CardDescription>
//                                     Code: {item.paperCode} • Semester {item.semester}
//                                 </CardDescription>
//                             </div>
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     viewSchedule(item.id);
//                                 }}
//                             >
//                                 View syllabus
//                             </Button>
//                         </div>
//                         <div className="mt-2 flex flex-wrap gap-2">
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                 Monday 9:00 AM
//                             </span>
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                 Wednesday 9:00 AM
//                             </span>
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                 Room 101
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </CardContent>
//         </Card>
//     );

// };

export default DashboardHOD;