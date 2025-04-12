import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SyllabusForm = () => {
  const [syllabus, setSyllabus] = useState({
    semester: '',
    paperCode: '',
    paperTitle: '',
    file: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSyllabus((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setSyllabus((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!syllabus.semester || !syllabus.paperCode || !syllabus.paperTitle) {
      alert('Please fill all required fields');
      return;
    }

    if (!syllabus.file) {
      alert('Please upload a syllabus PDF');
      return;
    }

    alert('Syllabus has been uploaded successfully');

    setSyllabus({
      semester: '',
      paperCode: '',
      paperTitle: '',
      file: null,
    });
  };

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upload New Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Semester */}
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Select
                onValueChange={(value) =>
                  setSyllabus((prev) => ({ ...prev, semester: value }))
                }
                value={syllabus.semester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Paper Code */}
            <div>
              <Label htmlFor="paperCode">Paper Code</Label>
              <Input
                id="paperCode"
                name="paperCode"
                value={syllabus.paperCode}
                onChange={handleChange}
                placeholder="e.g. CS101"
              />
            </div>

            {/* Paper Title */}
            <div>
              <Label htmlFor="paperTitle">Paper Title</Label>
              <Input
                id="paperTitle"
                name="paperTitle"
                value={syllabus.paperTitle}
                onChange={handleChange}
                placeholder="e.g. Introduction to Programming"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <Label>Syllabus PDF</Label>
            <div className="border border-dashed rounded-md p-4 text-center text-sm text-muted-foreground h-[10rem]">
              <p className="mb-1">Drag & drop a PDF file or</p>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                id="file"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file')?.click()}
              >
                Browse Files
              </Button>
              {syllabus.file && (
                <p className="mt-2 text-xs text-gray-500">
                  Selected: {syllabus.file.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">
              <i className="fas fa-upload mr-2" /> Upload Syllabus
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SyllabusForm;
