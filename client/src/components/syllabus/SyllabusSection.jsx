import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SyllabusForm from './SyllabusForm';
import SyllabusList from './SyllabusList';

const SyllabusSection = () => {
  const role = useSelector((state) => state.user.role);
  const isHod = role === 'hod';

  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-primary">Syllabus Management</h1>
          <p className="text-muted-foreground">Upload and manage course syllabi</p>
        </div>

        {isHod && (
          <Button onClick={handleToggleForm} variant="default">
            {showForm ? 'Hide Form' : 'Upload Syllabus'}
          </Button>
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        {isHod && showForm && (
          <div className="w-full">
            <SyllabusForm />
          </div>
        )}

        <div className="w-full">
          <SyllabusList />
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;
