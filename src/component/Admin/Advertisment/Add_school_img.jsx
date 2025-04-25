import React, { useEffect, useState } from "react";
import { Button } from "../../src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { get_school, updateSchoolInfo } from "../../../Redux_store/Api/School_image";
import { Textarea } from "../../src/components/ui/textarea";

const AddSchoolImg = () => {
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();

  // Fetch data from Redux store
  useEffect(() => {
    dispatch(get_school());
  }, [dispatch]);

  const { school, error, loading } = useSelector((parm) => parm.schools);

  useEffect(() => {
    // Only update form data once school data is available
    if (school?.schoolImages?.length) {
      const formatted = school.schoolImages.map((img) => ({
        id: img.id,
        title: img.school_name || "",
        description: img.school_description || "",
        images: [],
        errors: {}
      }));
      setFormData(formatted);
    }
  }, [school]);

  const handleInputChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    updated[index].errors[field] = ""; // Clear error on input change
    setFormData(updated);
  };

  const handleImageChange = (index, event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    const updated = [...formData];
    updated[index].images = [...updated[index].images, ...imageUrls];
    updated[index].errors.images = ""; // Clear image error
    setFormData(updated);
  };

  const validateForm = (index) => {
    const form = formData[index];
    let errors = {};

    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.description.trim()) errors.description = "Description is required.";
    if (form.images.length === 0) errors.images = "At least one image is required.";

    const updated = [...formData];
    updated[index].errors = errors;
    setFormData(updated);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (index) => {
    if (!validateForm(index)) return;

    const form = formData[index];
    const fileInput = document.getElementById(`upload-logo-${index}`);

    const formPayload = new FormData();
    formPayload.append("id", form.id);
    formPayload.append("school_name", form.title);
    formPayload.append("school_description", form.description);

    if (fileInput && fileInput.files.length > 0) {
      formPayload.append("image_path", fileInput.files[0]);
    }

    dispatch(updateSchoolInfo(formPayload));
  };


  return (
    <div>
      <div className="flex justify-center items-center mt-7 p-4">
        {formData.length > 0 && formData.map((form, index) => (
          <Card key={index} className="shadow-blue-500/50 w-full max-w-lg shadow-lg rounded-2xl overflow-hidden border border-gray-100/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Add School Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                    />
                    {form.errors.title && <p className="text-red-500 text-sm">{form.errors.title}</p>}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      className="text-sm sm:text-base leading-relaxed  p-4 rounded-xl "
                      id="description"
                      value={form.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    />
                    {form.errors.description && <p className="text-red-500 text-sm">{form.errors.description}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img
                        src={img}
                        alt={`Uploaded ${idx}`}
                        className="w-full h-full object-cover rounded-md border"
                      />
                    </div>
                  ))}
                </div>

                {form.errors.images && <p className="text-red-500 text-sm mt-1">{form.errors.images}</p>}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <label htmlFor={`upload-logo-${index}`}>
                <input
                  id={`upload-logo-${index}`}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageChange(index, e)}
                />
                <Button variant="outline" asChild>
                  <span>Upload Logo</span>
                </Button>
              </label>
              <Button onClick={() => handleSubmit(index)}>Submit</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddSchoolImg;
