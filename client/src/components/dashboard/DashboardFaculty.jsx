import { Link } from 'react-router-dom';
import { Users, BookOpen, Calendar, Clock, Presentation } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeachingSchedule from './TeachingSchedule';

const DashboardFaculty = () => {
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

  const currentFaculty = 'Sourav'; 

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {currentFaculty}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ActionCard 
          icon={<Users className="h-6 w-6 text-blue-500" />}
          title="Upcoming Meetings"
          description="You have 2 scheduled meetings"
          linkText="View Schedule"
          linkHref="/meetings"
          iconBackground='bg-[#BDCEF0]'
        />
        <ActionCard 
          icon={<Presentation className="h-6 w-6 text-emerald-500" />}
          title="Course Syllabus"
          description="Manage your course materials"
          linkText="View Syllabus"
          linkHref="/syllabus"
          iconBackground='bg-[#B1E3D3]'
        />
      </div>

      {/* Teaching Schedule */}
      <TeachingSchedule 
        syllabus={syllabus.slice(0, 3)}
        shrinkView={shrinkView}
        setShrinkView={setShrinkView}
        viewSchedule={viewSchedule}
      />
    </div>
  );
};

const ActionCard = ({ icon, title, description, linkText, linkHref,iconBackground }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className={`rounded-full ${iconBackground} p-3 mb-4`}>
        {icon}
      </div>
      <CardTitle className="text-lg mb-1">{title}</CardTitle>
      <CardDescription className="mb-4">{description}</CardDescription>
    </CardContent>
    <CardFooter className="justify-center p-0 pb-6">
      <Button variant="link" className="text-primary" asChild>
        <Link to={linkHref}>
          {linkText}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

// const TeachingSchedule = ({ syllabus, shrinkView, viewSchedule }) => {
//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row justify-between items-center pb-2">
//         <CardTitle>Your Teaching Schedule</CardTitle>
//         <Button variant="link" className="p-0 h-auto" asChild>
//           <Link to="/syllabus">View All Courses</Link>
//         </Button>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         {syllabus.map(item => (
//           <div
//             key={item.id}
//             onClick={() => viewSchedule(item.id)}
//             className={`p-4 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
//               shrinkView === item.id ? "bg-accent" : "bg-muted/50"
//             }`}
//           >
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <h3 className="font-medium">{item.paperTitle}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Code: {item.paperCode} • Semester {item.semester}
//                 </p>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   viewSchedule(item.id);
//                 }}
//               >
//                 View syllabus
//               </Button>
//             </div>
//             <div className="mt-2 flex flex-wrap gap-2">
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                 Monday 9:00 AM
//               </span>
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                 Wednesday 9:00 AM
//               </span>
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                 Room 101
//               </span>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

export default DashboardFaculty;