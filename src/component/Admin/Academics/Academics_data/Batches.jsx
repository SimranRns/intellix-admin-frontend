import React, { useState } from 'react'
import AppSidebar from '../../../src/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '../../../src/components/ui/sidebar'
import Header from '../../Dashboard/Header'
import { Button } from '../../../src/components/ui/Button'
import { ArrowLeft, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../src/components/ui/form'
import { Input } from '../../../src/components/ui/input'
import { useNavigate } from 'react-router'

const Batches = () => {
    const [AddBatches, setAddBatches] = useState()
    // const [navigate,setnavigate] = useNavigate()
    const goBack = () => {
        window.history.back();
    };
    return (
        <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
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
                                    className=" sm:max-w-[600px] shadow-lg p-6 rounded-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Add Batches</DialogTitle>
                                    </DialogHeader>
                                    {/* <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleAdddepartment)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="Department"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Enter name of department</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Department" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Confirm</Button>
                                        </form>
                                    </Form> */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Search Bar */}b 
                        <div className="flex items-center border border-blue-300 rounded-lg px-3 py-2 w-full sm:max-w-md">
                            <Search size={18} className="text-gray-500" />
                            <input
                                name="search"
                                type="text" placeholder="By Batches Name..." className="ml-2 w-full outline-none bg-transparent text-sm" />
                        </div>
                    </div>

                </main>

            </SidebarInset>
        </SidebarProvider>
    )
}

export default Batches
