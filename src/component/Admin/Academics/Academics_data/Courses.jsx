import React, { useEffect, useState } from 'react'
import AppSidebar from '../../../src/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '../../../src/components/ui/sidebar'
import Header from '../../Dashboard/Header'
import { Button } from '../../../src/components/ui/Button'
import { ArrowLeft, Pencil, Search } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../src/components/ui/form'
import { Input } from '../../../src/components/ui/input'
import { useNavigate } from 'react-router'
import { FormMessage } from '../../../src/components/ui/form'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../src/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../src/components/ui/dialog"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'

import { ScrollArea } from '../../../src/components/ui/scroll-area'
import { get_course, add_course, update_course } from '../../../../Redux_store/Api/Academic_course'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../../src/components/ui/pagination"


const Courses = () => {
    const [AddCourses, setAddCourses] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [editedCourseNames, setEditedCourseNames] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_course())
    }, [])
    const { course, loading, error } = useSelector((s) => s.acad_courses);
    // handle adding a new course
    const handleAddCourse = async (data) => {
        const newCourse = {
            course_name: data.course_name,
            course_type: data.course_type,
            course_duration: data.course_duration,
            banner: data.banner,
            date: data.date,
            course_price: data.course_price,
            discount_price: data.discount_price,
            status: data.status,
        };
        console.log(newCourse, 'n');

        try {
            await dispatch(add_course(newCourse)).unwrap();
            setAddCourses(false);
            form.reset();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };


    // validation schema
    const courseSchema = z.object({
        course_name: z.string().min(1, "Course name is required"),
        course_type: z.string().min(1, "Course type is required"),
        course_duration: z.coerce.number().min(1, "Duration is required"),
        banner: z.string().url("Invalid URL for banner image"),
        date: z.string().min(1, "Date is required"),
        course_price: z.coerce.number().min(0, "Price must be a positive number"),
        discount_price: z.coerce.number().min(0, "Discount price must be a positive number"),
        status: z.string().min(1, "Status is required"),
    });


    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            course_name: "",
            course_type: "",
            course_duration: 0,
            banner: "",
            date: "",
            course_price: 0,
            discount_price: 0,
            status: "",
        },
    });


    const goBack = () => window.history.back();

    const CoursePerPage = 12;
    const totalPages = course?.data ? Math.ceil(course.data.length / CoursePerPage) : 1;
    const startIndex = (currentPage - 1) * CoursePerPage;
    const selectedCourse = course?.data?.slice(startIndex, startIndex + CoursePerPage);

    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto p-4 sm:p-6 min-h-screen">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex gap-3 flex-wrap">
                            <Button onClick={goBack} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-md">
                                <ArrowLeft size={18} />
                                <span className="hidden md:inline">Back to Academics</span>
                            </Button>
                            <Button onClick={() => setAddCourses(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-md">
                                <span className="text-lg">+</span>
                                <span>Add Course</span>
                            </Button>
                        </div>
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="By Course Name..."
                                className="ml-2 w-full outline-none bg-transparent text-sm"
                            />
                        </div>
                    </div>

                    <Dialog open={AddCourses} onOpenChange={setAddCourses}>
                        <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()} className="sm:max-w-[500px] p-6 rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-center text-xl font-semibold">Add New Course</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleAddCourse)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="Course"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. BCA, MBA" type='text' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. English, Hindi" type='text' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Fees"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price/Fee Of Course</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0" type='number' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Duration</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0" type='text' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-5">
                                            Confirm
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>

                    <div className="grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5">
                        {selectedCourse?.map((card) => (
                            <Card key={card.id} className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden mt-8">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 text-xl text-center">{card.course_name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className=" text-sm text-center">Total Subjects: {card.course_type}</p>
                                </CardContent>
                                <CardFooter>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">View Details</Button>
                                        </DialogTrigger>
                                        <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()} className="w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
                                            {/* Top Buttons */}
                                            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="bg-blue-600 text-white hover:bg-blue-500 text-sm px-4 py-2 flex items-center gap-2 mt-5">
                                                            <Pencil /> Course Subjects
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()} className="sm:max-w-md p-6 rounded-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Subjects for {card.course_name}</DialogTitle>
                                                            <DialogDescription>Select the subjects you'd like to assign.</DialogDescription>
                                                        </DialogHeader>

                                                        {/* course subject button dialog for edit subject  */}
                                                        <div className="mt-4 space-y-3">
                                                            {["Math", "Science", "English", "Computer", "History"].map((subject) => (
                                                                <label key={subject} className="flex items-center space-x-2 text-sm">
                                                                    <input
                                                                        type="radio"
                                                                        name={`subject-${card.id}`} // important for grouping per course
                                                                        value={subject}
                                                                        checked={selectedSubjects[card.id] === subject}
                                                                        onChange={() => {
                                                                            setSelectedSubjects((prev) => ({
                                                                                ...prev,
                                                                                [card.id]: subject,
                                                                            }));
                                                                        }}
                                                                    />
                                                                    <span>{subject}</span>
                                                                </label>
                                                            ))}
                                                        </div>


                                                        <div className="flex justify-end mt-6">
                                                            <Button
                                                                onClick={() => {
                                                                    console.log(`Subjects for ${card.course_name}:`, selectedSubjects[card.id] || []);
                                                                }}
                                                                className="bg-blue-600 hover:bg-blue-500 text-white"
                                                            >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    className="bg-blue-600 text-white hover:bg-blue-500 text-sm px-4 py-2 flex items-center gap-2 mt-5"
                                                    onClick={() => setEditingCourseId(card.id)}
                                                >
                                                    <Pencil /> Course Name
                                                </Button>

                                            </div>
                                            {/* course name edit  */}
                                            {editingCourseId === card.id ? (
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        value={editedCourseNames[card.id] ?? card.course_name}
                                                        onChange={(e) =>
                                                            setEditedCourseNames((prev) => ({
                                                                ...prev,
                                                                [card.id]: e.target.value,
                                                            }))
                                                        }
                                                        className="border px-3 py-2 rounded-md w-full mb-2 bg-transparent"
                                                    />

                                                    <Button
                                                        className="bg-blue-600 hover:bg-blue-500 text-white"
                                                        onClick={async () => {
                                                            const updatedName = editedCourseNames[card.id];
                                                            if (!updatedName) return;

                                                            const payload = {
                                                                id: card.id, // Assuming `card.id` is your course ID
                                                                course_name: updatedName,
                                                            };

                                                            try {
                                                                await dispatch(update_course(payload)).unwrap();
                                                                setEditingCourseId(null); // Close the input
                                                            } catch (error) {
                                                                console.error("Failed to update course name:", error);
                                                            }
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>

                                                </div>
                                            ) : (
                                                <h2 className="text-xl font-semibold mb-4">
                                                    Course: {editedCourseNames[card.id] ?? card.course_name}
                                                </h2>
                                            )}

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    {/* subject total will come  */}
                                                    <div className="text-gray-500">Subjects</div>
                                                    <div className="text-2xl font-bold">{card.course_type}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-gray-500">Batches</div>
                                                    {/* <div className="text-2xl font-bold">{card.totalBatches}</div> */}
                                                </div>
                                            </div>

                                            <div className="overflow-x-auto rounded-lg border ">
                                                <ScrollArea className="h-[350px]  rounded-md border p-4">
                                                    <table className="min-w-full text-sm">
                                                        <thead className="bg-blue-100 text-gray-700 ">
                                                            <tr>
                                                                <th className="text-left p-2">Batch ID</th>
                                                                <th className="text-left p-2">Batch Name</th>
                                                                <th className="text-left p-2">Start Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {course?.data?.map((batch) => (
                                                                <tr key={batch.id} className="border-t">
                                                                    <td className="p-2">{batch.id}</td>
                                                                    <td className="p-2">{batch.course_name}</td>
                                                                    <td className="p-2">{batch.date}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </ScrollArea>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    {/* pagination */}
                    {course?.data?.length > CoursePerPage && (
                        <Pagination >
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-4 py-2 rounded-md ${currentPage === i + 1
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-blue-500  hover:text-white"
                                                }`}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() =>
                                            setCurrentPage(Math.min(totalPages, currentPage + 1))
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Courses;
