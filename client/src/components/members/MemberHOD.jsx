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

const MemberHOD = () => {
  const hods = [
    {
      id: 1,
      name: "abcd",
      department: "Computer Science",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 2,
      name: "abcd",
      department: "Computer Science",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 3,
      name: "abcd",
      department: "Computer Science",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 4,
      name: "abcd",
      department: "Computer Science",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
    {
      id: 5,
      name: "abcd",
      department: "Computer Science",
      phone: "+1234566",
      email: "tarak@gmail.com"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heads of Department</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of department heads</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hods.map((hod) => (
              <TableRow key={hod.id}>
                <TableCell className="font-medium">{hod.name}</TableCell>
                <TableCell>{hod.department}</TableCell>
                <TableCell>{hod.phone}</TableCell>
                <TableCell>{hod.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberHOD;