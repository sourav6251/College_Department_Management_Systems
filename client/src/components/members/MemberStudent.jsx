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

const MemberStudent = () => {

  const students = [
    {
      id: 1,
      name: "abcd",
      semester: "1",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 2,
      name: "abcd",
      semester: "2",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 3,
      name: "abcd",
      semester: "3",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 4,
      name: "abcd",
      semester: "4",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 5,
      name: "abcd",
      semester: "5",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of student members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>Semester {student.semester}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberStudent;