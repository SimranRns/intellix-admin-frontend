import React, { useState } from 'react'
import { Button } from '../../../../src/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../src/components/ui/dialog"
import { Input } from "../../../../src/components/ui/input"
import { Label } from "../../../../src/components/ui/label"
import { FileDown, Pencil } from "lucide-react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../../src/components/ui/table"
import { ScrollArea } from "../../../../src/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../../src/components/ui/select"
import { useNavigate } from 'react-router'

const studentData = [
    { id: "12340559", name: "mohan" },
    { id: "12340560", name: "HARSHITA THORY" },
    { id: "12340561", name: "KRISHNA PRAJAPATI" },
    { id: "12340562", name: "MAYANK" },
    { id: "12340563", name: "MAYANK RAJAT" },
    { id: "12340564", name: "NARMATA MANGLANI" },
]

const Viewdetail = () => {
    const [openFirst, setOpenFirst] = useState(false)
    const [openSec, setOpenSec] = useState(false)
    const navigate = useNavigate()

    const [batchDetails, setBatchDetails] = useState({
        name: "",
        fee: "",
        course: "",
        startDate: "",
        endDate: "",
    })

    const handleChange = (field, value) => {
        setBatchDetails(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        setBatchDetails({
            name: "Batch A",
            fee: "10000",
            course: "React",
            startDate: "2024-01-01",
            endDate: "2024-06-01",
        })
        setOpenFirst(false)
        setTimeout(() => setOpenSec(true), 50)
    }

    const handleSave = () => {
        console.log("Saved batch data:", batchDetails)
        setOpenSec(false)
    }

    const handleAddPayment = () => {
        navigate(`/student-payment-history`);
        navigate(`/add-payment`);
    };

    return (
        <div>
            {/* First Dialog */}
            <Dialog open={openFirst} onOpenChange={setOpenFirst}>
                <DialogTrigger asChild>
                    <Button className="mt-4 w-full bg-blue-500 hover-bg-blue-600 text-white py-2 px-6 rounded-md flex items-center gap-2  transition-all">
                        <Pencil className="w-4 h-4" />
                        View Detail
                    </Button>
                </DialogTrigger>

                <DialogContent
                    className="max-w-5xl w-full rounded-2xl p-6"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Batch Details</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                        <Button
                            onClick={handleNext}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit Batch
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
                            <FileDown className="w-4 h-4" />
                            Export Data
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <p className="font-semibold">Course Name --</p>
                        <p className="font-semibold">Batch Name --</p>
                        <p className="font-semibold text-right">Total No. Of Students : {studentData.length}</p>
                    </div>

                    <ScrollArea className="mt-6 border rounded-md max-h-[350px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Payments</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentData.length > 0 ? (
                                    studentData.map((student, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>
                                                <button 
                                                onClick={()=>{handleAddPayment(student.id)}}
                                                className="text-blue-600 hover:underline">
                                                    Add Payment
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => handleAddPayment(student.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Payment History
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-red-600 py-10">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>

                    <DialogFooter className="mt-6 flex justify-center">
                        <Button onClick={() => setOpenFirst(false)} className="bg-blue-500 hover:bg-blue-600 px-8 text-white">
                            Back
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Second Dialog */}
            <Dialog open={openSec} onOpenChange={setOpenSec}>
                <DialogContent
                    className="sm:max-w-2xl w-full rounded-2xl p-6 shadow-lg"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold">Edit Batch</DialogTitle>
                        <DialogDescription className="text-md mt-1">
                            Update the batch information below and save your changes.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">Name :</Label>
                            <Input
                                value={batchDetails.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter batch name"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">Batch Fee :</Label>
                            <Input
                                value={batchDetails.fee}
                                onChange={(e) => handleChange("fee", e.target.value)}
                                type="number"
                                placeholder="Enter batch fee"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">Course :</Label>
                            <div className="col-span-3">
                                <Select
                                    value={batchDetails.course}
                                    onValueChange={(val) => handleChange("course", val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Courses</SelectLabel>
                                            <SelectItem value="React">React</SelectItem>
                                            <SelectItem value="Node.js">Node.js</SelectItem>
                                            <SelectItem value="Python">Python</SelectItem>
                                            <SelectItem value="Java">Java</SelectItem>
                                            <SelectItem value="DSA">DSA</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">Start Date :</Label>
                            <Input
                                type="date"
                                value={batchDetails.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">End Date :</Label>
                            <Input
                                type="date"
                                value={batchDetails.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Viewdetail
