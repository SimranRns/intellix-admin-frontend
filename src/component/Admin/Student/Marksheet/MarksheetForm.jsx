import React, { useState } from 'react';
import Header from '../../Dashboard/Header';
import { SidebarInset, SidebarProvider } from '../../../src/components/ui/sidebar';
import AppSidebar from '../../../src/components/ui/app-sidebar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../../src/components/ui/button';

const MarksheetForm = () => {
  const [marksheetName, setMarksheetName] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [student, setStudent] = useState('');
  const [exam, setExam] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      marksheetName,
      course,
      batch,
      student,
      exam
    });
  };

  // Common Input Class
  const inputClass = "w-full border-2  border-gray-400 rounded-xl h-10 px-3 bg-transparent";
  const navigate = useNavigate();


  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
        
            <div className="w-full border rounded-lg flex gap-5">
            <Button
                            className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm flex items-center gap-2 m-2 mt-3"
                            onClick={() => navigate(-1)}
                          >
                            <ArrowLeft size={18} />
                            <span className="hidden md:inline">Back to student</span>
                          </Button>
                          <h2 className="text-2xl text-center font-semibold mb-4 mt-3" >Marksheet</h2>
            </div>
          <div className="w-[60vw] h-[60vh] mx-auto">
            {/* <h2 className="text-2xl text-center font-semibold mb-4">Marksheet</h2> */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Marksheet Name */}
              <div>
                <label htmlFor="marksheetName" className="block font-semibold text-lg sm:text-xl mb-4">Enter Marksheet Name *</label>
                <input
                  type="text"
                  id="marksheetName"
                  value={marksheetName}
                  onChange={(e) => setMarksheetName(e.target.value)}
                  className={inputClass}
                  placeholder="Enter Marksheet Name"
                  required
                />
              </div>

              {/* Course */}
              <div>
                <label htmlFor="course" className="block font-semibold text-lg sm:text-xl mb-4">Select Course *</label>
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option className='text-black' value="">Select Course</option>
                  <option className='text-black' value="course1">Course 1</option>
                  <option className='text-black' value="course2">Course 2</option>
                  <option className='text-black' value="course3">Course 3</option>
                </select>
              </div>

              {/* Batch */}
              <div>
                <label htmlFor="batch" className="block font-semibold text-lg sm:text-xl mb-4">Select Batch *</label>
                <select
                  id="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option className='text-black' value="">Select Batch</option>
                  <option className='text-black' value="batch1">Batch 1</option>
                  <option className='text-black' value="batch2">Batch 2</option>
                  <option className='text-black' value="batch3">Batch 3</option>
                </select>
              </div>

              {/* Student */}
              <div>
                <label htmlFor="student" className="block font-semibold text-lg sm:text-xl mb-4">Select Student *</label>
                <select
                  id="student"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option className='text-black' value="">Select Student</option>
                  <option className='text-black' value="student1">Student 1</option>
                  <option className='text-black' value="student2">Student 2</option>
                  <option className='text-black' value="student3">Student 3</option>
                </select>
              </div>

              {/* Exam */}
              <div>
                <label htmlFor="exam" className="block font-semibold text-lg sm:text-xl mb-4">Select Exam *</label>
                <select
                  id="exam"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option className='text-black' value="">Select Exam</option>
                  <option className='text-black' value="exam1">Exam 1</option>
                  <option className='text-black' value="exam2">Exam 2</option>
                  <option className='text-black' value="exam3">Exam 3</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-64 mt-[30px] py-2 bg-blue-600 text-white font-semibold rounded-md transition duration-200"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
          </SidebarInset>
        </SidebarProvider>
    </>
  );
};

export default MarksheetForm;
