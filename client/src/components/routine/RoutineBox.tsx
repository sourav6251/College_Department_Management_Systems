import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

const RoutineBox = ({ sem }) => {
    return (
        <div>
            <Tabs defaultValue="monday" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="monday">Monday</TabsTrigger>
                    <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                    <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    <TabsTrigger value="thursday">Thursday</TabsTrigger>
                    <TabsTrigger value="friday">Friday</TabsTrigger>
                    <TabsTrigger value="saturday">Saturday</TabsTrigger>
                </TabsList>

                <section className="p-4">
                    <h1>{sem}</h1>
                    {/* Monday */}
                    <TabsContent value="monday">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>
                                            Data Structures & Algorithms
                                        </span>
                                        <span className="text-sm font-medium text-gray-500">
                                            8:00 AM - 9:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Sarah Johnson
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-202
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Database Systems</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            10:00 AM - 11:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Michael Chen
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-305
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                            Lab
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Operating Systems</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            1:00 PM - 2:30 PM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. David Wilson
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-101
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Tuesday */}
                    <TabsContent value="tuesday">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Computer Networks</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            9:00 AM - 10:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Emily Rodriguez
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-203
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Software Engineering</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            11:00 AM - 12:30 PM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Robert Taylor
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-304
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                                            Tutorial
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Wednesday */}
                    <TabsContent value="wednesday">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>
                                            Data Structures & Algorithms
                                        </span>
                                        <span className="text-sm font-medium text-gray-500">
                                            8:00 AM - 9:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Sarah Johnson
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-202
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                            Lab
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Artificial Intelligence</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            2:00 PM - 3:30 PM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Lisa Wong
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-401
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Thursday */}
                    <TabsContent value="thursday">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Database Systems</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            10:00 AM - 11:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Michael Chen
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-305
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Computer Networks Lab</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            1:00 PM - 3:30 PM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Emily Rodriguez
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: NET-101
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                            Lab
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Friday */}
                    <TabsContent value="friday">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Software Engineering</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            9:00 AM - 10:30 AM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. Robert Taylor
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: CS-304
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                            Lecture
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Operating Systems Lab</span>
                                        <span className="text-sm font-medium text-gray-500">
                                            11:00 AM - 1:30 PM
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Prof. David Wilson
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Room: OS-LAB
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                            Lab
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </section>
            </Tabs>
        </div>
    );
};

export default RoutineBox;
