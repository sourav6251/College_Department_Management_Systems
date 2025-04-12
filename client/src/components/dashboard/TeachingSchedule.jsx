import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TeachingSchedule = ({ syllabus, shrinkView, viewSchedule }) => {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 ease-in-out">
      <CardHeader className="flex flex-row justify-between items-center pb-2 border-b">
        <CardTitle className="text-lg text-primary">Your Teaching Schedule</CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto" asChild>
          <Link to="/syllabus">View All Courses</Link>
        </Button>
      </CardHeader>

      <div className="flex transition-all duration-300 ease-in-out">
        {/* Syllabus list */}
        <CardContent className={`${shrinkView ? "w-1/2" : "w-full"} transition-all duration-300 ease-in-out grid gap-4 p-4`}>
          {syllabus.map((item) => (
            <div
              key={item.id}
              onClick={() => viewSchedule(item.id)}
              className="p-4 rounded-lg bg-muted/50 hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-primary">
                    {item.paperTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Code: {item.paperCode} • Semester {item.semester}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewSchedule(item.id);
                  }}
                >
                  View syllabus
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  Monday 9:00 AM
                </Badge>
                <Badge variant="secondary">
                  Wednesday 9:00 AM
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Room 101
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Optional details panel */}
        <div
          className={`${
            shrinkView ? "w-1/2" : "w-0"
          } bg-red-200 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {shrinkView && (
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Syllabus Details
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing details for ID: {shrinkView}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TeachingSchedule;