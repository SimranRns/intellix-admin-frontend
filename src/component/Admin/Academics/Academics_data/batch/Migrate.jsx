import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../src/components/ui/dialog'
import { Button } from '../../../../src/components/ui/button'
import { Label } from '../../../../src/components/ui/label'
import { Input } from '../../../../src/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../src/components/ui/select'

const Migrate = () => {

    const [openmigrate,setOpenmigrate] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpenmigrate(true) } className="mt-4 w-full bg-blue-500 text-white py-2 px-8 flex items-center rounded-md hover:bg-blue-600  transition-all whitespace-nowrap">
                Migrate
            </Button>
            <Dialog open={openmigrate} onOpenChange={setOpenmigrate}>
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
                                // value={batchDetails.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Enter batch name"
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">Batch Fee :</Label>
                            <Input
                                // value={batchDetails.fee}
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
                                    // value={batchDetails.course}
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
                                // value={batchDetails.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label className="md:text-right text-left font-medium">End Date :</Label>
                            <Input
                                type="date"
                                // value={batchDetails.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            // onClick={handleSave}
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

export default Migrate