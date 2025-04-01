

import React, { useState } from "react";
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

const AddSchoolImg = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]); // Append new images
    setErrors((prev) => ({ ...prev, images: "" })); // Clear error if images are added
  };

  const validateForm = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (images.length === 0)
      newErrors.images = "At least one image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { title, description, images });
      // alert("Image submitted successfully!");
    }
  };

  return (
    <div>
        
      <div className="flex justify-center items-center mt-7 p-4">
        <Card className="w-full max-w-lg shadow-lg rounded-2xl  ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Add School Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={img}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover rounded-md border"
                      />
                    </div>
                  ))}
                </div>
              )}
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <label htmlFor="upload-logo">
              <input
                id="upload-logo"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <Button variant="outline" asChild>
                <span>Upload Logo</span>
              </Button>
            </label>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddSchoolImg;
