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
import { Clock } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { update_time_Batches } from '../../../../../Redux_store/Api/Batches'

const UpdateTime = () => {
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [error, setError] = useState("");
    const [open, setopen] = useState(false);
    const validateTimes = () => {
        if (!fromTime || !toTime) {
            return "Both time fields are required.";
        }

        const from = new Date(`1970-01-01T${fromTime}`);
        const to = new Date(`1970-01-01T${toTime}`);

        if (from >= to) {
            return "Start time must be before end time.";
        }



        return "";
    };

    const handleSave = () => {
        const validationError = validateTimes();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(""); // Clear the error if no validation error

        // Dispatch the Redux action to update the batch time
        const data = {
            id: 1, // Example batch ID; replace with dynamic ID if needed
            start_time: fromTime,
            end_time: toTime,
        };

        dispatch(update_time_Batches(data));

        // Reset form fields and close dialog after successful save
        setFromTime("");
        setToTime("");
        setopen(false);
    };
    const dispatch = useDispatch();

    return (
        <div>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                    <Button onClick={() => { setopen(true) }} className="mt-4 w-full bg-blue-500 text-white py-2 px-8 flex items-center rounded-md hover:bg-blue-600  transition-all whitespace-nowrap">
                        Update Time
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="sm:max-w-[425px]"
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>Update Batch Timing</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="w-full p-6 shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Select Time Range</h3>

                            <Label className="mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 " />
                                From Time
                            </Label>
                            <Input
                                type="time"
                                className="w-full"
                                value={fromTime}
                                onChange={(e) => setFromTime(e.target.value)}
                            />

                            <Label className="mt-4 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                To Time
                            </Label>
                            <Input
                                type="time"
                                className="w-full"
                                value={toTime}
                                onChange={(e) => setToTime(e.target.value)}
                            />

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleSave}
                            type="button"
                        >
                            Save changes
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateTime
