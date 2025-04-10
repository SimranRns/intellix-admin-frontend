import React, { useState } from 'react'
import AppSidebar from '../../../src/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '../../../src/components/ui/sidebar'
import Header from '../../Dashboard/Header'
import { Button } from '../../../src/components/ui/Button'
import { ArrowLeft, Search, CheckCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '../../../src/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../src/components/ui/form'
import { Input } from '../../../src/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../src/components/ui/select"

const batchSchema = z.object({
    batchName: z.string().min(1, 'Batch name is required'),
    course: z.string().min(1, { message: "Course is required" }),
})

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../src/components/ui/card"
import Viewdetail from './batch/Viewdetail'
import Update_time from './batch/Update_time'
import Migrate from './batch/Migrate'

const Batches = () => {
    const [AddBatches, setAddBatches] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const form = useForm({
        resolver: zodResolver(batchSchema),
        defaultValues: {
            batchName: '',
            course: ''
        }
    })

    const [card, setcard] = useState([
        {
            batchname: "BCA",
            course: "English"
        },
        {
            batchname: "BCA",
            course: "English"
        },
        {
            batchname: "BCA",
            course: "English"
        },
        {
            batchname: "BCA",
            course: "English"
        },
    ])

    const onSubmit = (data) => {
        setcard(prev => [...prev, { batchname: data.batchName, course: data.course }])
        setShowSuccess(true)
        setAddBatches(false)
        form.reset()

        setTimeout(() => {
            setShowSuccess(false)
        }, 3000)
    }

    const goBack = () => {
        window.history.back()
    }

    return (
        <SidebarProvider style={{ '--sidebar-width': '15rem' }}>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="w-full shadow-md shadow-blue-300/30 rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-8 py-4 gap-3">
                        <div className="flex items-center gap-3">
                            <Button
                                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                                onClick={goBack}
                            >
                                <ArrowLeft size={18} />
                                <span className="hidden md:inline">Back to Academics</span>
                            </Button>
                            <Button
                                onClick={() => setAddBatches(true)}
                                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2"
                            >
                                <span className="text-lg">+</span>
                                <span>Add Batches</span>
                            </Button>
                            <Dialog open={AddBatches} onOpenChange={setAddBatches}>
                                <DialogContent
                                    onPointerDownOutside={(e) => e.preventDefault()}
                                    onEscapeKeyDown={(e) => e.preventDefault()}
                                    className="sm:max-w-[600px] min-h-[400px] shadow-lg p-6 rounded-lg"
                                >
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Add Batches</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="batchName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Enter name of Batch</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Batch Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="course"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Select Course</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a Course" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Courses</SelectLabel>
                                                                    <SelectItem value="course1">course1</SelectItem>
                                                                    <SelectItem value="course2">course2</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500">Confirm</Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                name="search"
                                type="text"
                                placeholder="By Batches Name..."
                                className="ml-2 w-full outline-none bg-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="flex items-center gap-3 bg-green-100 text-green-800 px-4 py-3 rounded-xl shadow-md w-fit mx-auto my-6">
                            <CheckCircle className="text-green-600" size={24} />
                            <span>Batch added successfully!</span>
                        </div>
                    )}

                    {/* Cards */}
                    <div className="grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            card.map((pass, index) => (
                                <Card
                                    key={index}
                                    className="shadow-md shadow-blue-500/50 rounded-2xl overflow-hidden mt-8"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            {pass.batchname}
                                        </CardTitle>
                                        <CardDescription className="text-lg">{pass.course}</CardDescription>
                                    </CardHeader>
                                    <CardContent className='grid gap-2 sm:grid-cols-1 lg:grid-cols-2'>
                                        <Viewdetail />
                                        <Update_time />
                                        <Migrate />
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Batches
