import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../ui/select";
import { Users, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Member {
    name: string;
    department: string;
    phone?: string;
    email?: string;
}

interface MemberListProps {
    data: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ data = [] }) => {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<"name" | "department">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filterDepartment, setFilterDepartment] = useState("all");

    // ✅ Type-safe department values
    const departments: string[] = useMemo(() => {
        const allDepts = data.map((m) => m?.department).filter(Boolean);
        return ["all", ...Array.from(new Set(allDepts))];
    }, [data]);

    const filtered = data
        .filter((member) => {
            const nameMatch = member?.name
                ?.toLowerCase()
                .includes(search.toLowerCase());
            const deptMatch =
                filterDepartment === "all" ||
                member?.department === filterDepartment;
            return nameMatch && deptMatch;
        })
        .sort((a, b) => {
            const aVal = a?.[sortKey]?.toLowerCase?.() || "";
            const bVal = b?.[sortKey]?.toLowerCase?.() || "";
            return sortOrder === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const toggleSort = (key: "name" | "department") => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const SortIndicator = ({ active }: { active: boolean }) => {
        return active ? (
            sortOrder === "asc" ? (
                <ChevronUp className="h-4 w-4 ml-1 text-muted-foreground transition" />
            ) : (
                <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground transition" />
            )
        ) : (
            <ChevronDown className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-50 transition" />
        );
    };

    return (
        <div className="w-full space-y-4 p-0">
            {/* Filter & Search Row */}
            <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-2 w-full">
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-64"
                />
                <Select
                    value={filterDepartment}
                    onValueChange={(val: string) => setFilterDepartment(val)}
                >
                    <SelectTrigger className="md:w-48 w-full">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                                {dept === "all" ? "All Departments" : dept}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border dark:border-slate-800">
                <Table>
                    <TableHeader>
                        <TableRow className="dark:border-slate-800">
                            <TableHead
                                className="text-center cursor-pointer group"
                                onClick={() => toggleSort("department")}
                            >
                                <div className="flex justify-center items-center">
                                    Department
                                    <SortIndicator
                                        active={sortKey === "department"}
                                    />
                                </div>
                            </TableHead>
                            <TableHead
                                className="text-center cursor-pointer group"
                                onClick={() => toggleSort("name")}
                            >
                                <div className="flex justify-center items-center">
                                    Name
                                    <SortIndicator
                                        active={sortKey === "name"}
                                    />
                                </div>
                            </TableHead>
                            <TableHead className="text-center">Phone</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filtered.length > 0 ? (
                                filtered.map((member, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="border-b dark:border-slate-800"
                                    >
                                        <TableCell className="text-center">
                                            <Badge
                                                variant="outline"
                                                className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                            >
                                                {member?.department || "—"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {member?.name || "—"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {member?.phone || "—"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {member?.email || "—"}
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                            <Users className="h-10 w-10 mb-2" />
                                            <p className="text-sm italic">
                                                No members found.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MemberList;
