import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MemberFaculty = () => {
  // Sample faculty data - replace with your actual data
  const facultyMembers = [
    {
      id: 1,
      name: "asdf",
      email: "tarak@gmail.com",
      phone: "+12345",
    },
    {
      id: 2,
      name: "asdf",
      email: "tarak@gmail.com",
      phone: "+12345",
    },
    {
      id: 3,
      name: "asdf",
      email: "tarak@gmail.com",
      phone: "+112345",
    },
    {
      id: 4,
      name: "asdf",
      email: "tarak@gmail.com",
      phone: "+112345",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of faculty members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facultyMembers.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{faculty.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberFaculty;