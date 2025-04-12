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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import MemberExternal from "./MemberExternal";
import MemberFaculty from "./MemberFaculty";
import MemberStudent from "./MemberStudent";
import MemberHOD from "./MemberHOD";

const memberStats = {
  students: { total: 1245, active: 1189, new: 56 },
  faculty: { total: 84, active: 79, onLeave: 5 },
  external: { total: 42, active: 38, pending: 4 },
  hods: { total: 19},
};

const MemberSection = () => {
  const [selected, setSelected] = useState(null);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 w-full">
      {/* Left Panel */}
      {selected && (
        <div className="lg:col-span-2 bg-background p-4 rounded-xl border shadow h-fit overflow-y-auto">
          {renderSelectedComponent()}
        </div>
      )}

      {/* Right Panel */}
      <div
        className={`${
          selected ? "lg:col-span-1 grid-cols-1" : "lg:col-span-3 grid-cols-4"
        } grid gap-6   h-fit`}
      >
        <MemberCard
          onClick={() => handleCardClick("hod")}
          title="Department Heads"
          description="Heads of Department"
          icon={Shield}
          gradient="from-amber-500 to-amber-600"
          stats={memberStats.hods}
          statItems={[{ icon: UserCog, value: "total", label: "Total" }]}
        />

        <MemberCard
          onClick={() => handleCardClick("student")}
          title="Student Members"
          description="Department of Computer Science"
          icon={GraduationCap}
          gradient="from-blue-500 to-blue-600"
          stats={memberStats.students}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
            { icon: UserPlus, value: "new", label: "New", color: "blue" },
          ]}
        />

        <MemberCard
          onClick={() => handleCardClick("faculty")}
          title="Faculty Members"
          description="Teaching Staff & Researchers"
          icon={Briefcase}
          gradient="from-purple-500 to-purple-600"
          stats={memberStats.faculty}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
          ]}
        />

        <MemberCard
          onClick={() => handleCardClick("external")}
          title="External Members"
          description="Collaborators & Guests"
          icon={Users}
          gradient="from-emerald-500 to-emerald-600"
          stats={memberStats.external}
          statItems={[
            { icon: Users, value: "total", label: "Total" },
            { icon: UserCheck, value: "active", label: "Active", color: "green" },
          ]}
        />
      </div>
    </div>
  );
};

const MemberCard = ({
  onClick,
  title,
  description,
  icon: Icon,
  gradient,
  stats,
  statItems,
}) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-xl transition-shadow duration-300 h-fit"
    >
      <div className={`bg-gradient-to-r ${gradient} text-white p-4 rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="mt-1 text-sm opacity-90">{description}</div>
      </div>

      <CardContent className="py-2 ">
        <div className="flex flex-wrap gap-2 justify-center mt-2 py-3" >
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
      </CardContent>
    </Card>
  );
};

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
    <div className={`rounded-lg px-3 py-2 text-center ${colorClasses[color]}`}>
      <div className="flex items-center justify-center gap-1">
        <Icon className="w-4 h-4" />
        <span className="font-semibold">{value}</span>
      </div>
      <div className="text-xs mt-1">{label}</div>
    </div>
  );
};

export default MemberSection;
