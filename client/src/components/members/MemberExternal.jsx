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

const MemberExternal = () => {
  const externalMembers = [
   
    {
      id: 1,
      name: "asdfg",
      email: "tarak@gmail.com",
      phone: "+12345",
    },
    {
      id: 2,
      name: "asdfg",
      email: "tarak@gmail.com",
      phone: "+1 (555) 987-6543",
    },
    {
      id: 3,
      name: "qwefrt",
      email: "tarak@gmail.com",
      phone: "+12356",
    },
  ];

  return (
    <Card className="border rounded-lg shadow-sm h-fit">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">External Members</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableCaption className="py-4">List of external collaborators</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[40%]">Name</TableHead>
              <TableHead className="w-[35%]">Email</TableHead>
              <TableHead className="w-[25%]">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {externalMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div>
                    <p>{member.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-blue-600 hover:underline">
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </TableCell>
                <TableCell>{member.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberExternal;