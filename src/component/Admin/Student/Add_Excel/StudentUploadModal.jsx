import { useState } from "react";
import { Button } from "../../../src/components/ui/button";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select";
import { Card, CardContent } from "../../../src/components/ui/card";
import { UploadCloud } from "lucide-react";

export default function StudentUploadModal() {
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [emiCount, setEmiCount] = useState(0);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <CardContent className="space-y-4">
          <div>
            <Label className="font-semibold">Select Course<span className="text-red-500">*</span></Label>
            <Select onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="--Select Course--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course1">Course 1</SelectItem>
                <SelectItem value="course2">Course 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-semibold">Select Batch<span className="text-red-500">*</span></Label>
            <Select onValueChange={setBatch}>
              <SelectTrigger>
                <SelectValue placeholder="--Select Batch--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batch1">Batch 1</SelectItem>
                <SelectItem value="batch2">Batch 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-semibold">Emi Count<span className="text-red-500">*</span></Label>
            <Input
              type="number"
              value={emiCount}
              onChange={(e) => setEmiCount(e.target.value)}
              min={0}
            />
          </div>

          <div>
            <Label className="font-semibold">Upload Excel</Label>
            <div className="text-sm text-blue-600 cursor-pointer underline flex items-center">
              <a href="/sample.xlsx" download>Download Sample.xlsx</a>
              <UploadCloud className="ml-2" size={16} />
            </div>
            <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mt-2" />
          </div>

          <Button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg">Add Students</Button>
        </CardContent>
      </Card>
    </div>
  );
}
