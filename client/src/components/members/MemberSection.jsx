import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  UserCog,
  Shield,
  UserPlus,
  UserX,
} from "lucide-react";
import MemberExternal from "./MemberExternal";
import MemberFaculty from "./MemberFaculty";
import MemberStudent from "./MemberStudent";
import MemberHOD from "./MemberHOD";
import { memberStats } from "../../data/mockData";
// import { memberStats } from "../../data/mockData";


const MemberSection = () => {
  const [selected, setSelected] = useState(null);
  // const memberStats=MemberStats;
//   const memberStats = {
//     students: { total: 1245, active: 1189, new: 56 },
//     faculty: { total: 84, active: 79, onLeave: 5 },
//     external: { total: 42, active: 38, pending: 4 },
//     hods: { total: 12, active: 11, onDuty: 9 },
//   };
 
  const renderSelectedComponent = () => {
    switch (selected) {
      case "student":
        return <MemberStudent />;
      case "faculty":
        return <MemberFaculty />;
      case "external":
        return <MemberExternal />;
      case "hod":
        return <MemberHOD />;
      default:
        return null;
    }
  };

  const handleCardClick = (type) => {
    setSelected((prev) => (prev === type ? null : type));
  };
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 w-full`}>
      {/* Left Panel */}
      {selected && (
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow border border-gray-100">
   
          {renderSelectedComponent()}
        </div>
      )}

      {/* Right Panel */}

      <div
    className={`${
      selected ? "lg:col-span-1  grid-cols-1" : "lg:col-span-3 grid-cols-4"
    } grid gap-6`}
  >
        {/* HOD Card */}
        <MemberCard
           onClick={() => handleCardClick("hod")}
          title="Department Heads"
          description="Heads of Department"
          icon={Shield}
          gradientFrom="from-amber-500"
          gradientTo="to-amber-600"
          stats={memberStats.hods}
          statItems={[{ icon: UserCog, value: "total", label: "Total" }]}
        />

        {/* Student Card */}
        <MemberCard
          onClick={() => handleCardClick("student")}
          title="Student Members"
          description="Department of Computer Science"
          icon={GraduationCap}
          gradientFrom="from-blue-500"
          gradientTo="to-blue-600"
          stats={memberStats.students}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
            { icon: UserPlus, value: "new", label: "New", color: "blue" },
          ]}
        />

        {/* Faculty Card */}
        <MemberCard
           onClick={() => handleCardClick("faculty")}
          title="Faculty Members"
          description="Teaching Staff & Researchers"
          icon={Briefcase}
          gradientFrom="from-purple-500"
          gradientTo="to-purple-600"
          stats={memberStats.faculty}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
            { icon: UserX, value: "onLeave", label: "On Leave", color: "amber" },
          ]}
        />

        {/* External Card */}
        <MemberCard
           onClick={() => handleCardClick("external")}
          title="External Members"
          description="Collaborators & Guests"
          icon={Users}
          gradientFrom="from-emerald-500"
          gradientTo="to-emerald-600"
          stats={memberStats.external}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
            { icon: UserX, value: "pending", label: "Pending", color: "yellow" },
          ]}
        />
      </div>
    </div>
  );
};

// Reusable MemberCard component
const MemberCard = ({
  onClick,
  title,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  stats,
  statItems,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="mt-2 text-sm opacity-90">{description}</div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`${
                statItems.length === 1
                  ? "w-full flex justify-center"
                  : "flex-1 min-w-[30%] max-w-[33%]"
              }`}
            >
              <StatBadge
                icon={item.icon}
                value={stats[item.value]}
                label={item.label}
                color={item.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// StatBadge component
const StatBadge = ({ icon: Icon, value, label, color = "gray" }) => {
  const colorClasses = {
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div className={`${colorClasses[color]} px-3 py-2 rounded-lg`}>
      <div className="flex items-center justify-center gap-1">
        <Icon className="w-4 h-4" />
        <span className="font-semibold">{value}</span>
      </div>
      <div className="text-xs mt-1">{label}</div>
    </div>
  );
};

export default MemberSection;
