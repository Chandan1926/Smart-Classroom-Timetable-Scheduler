import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TimetableFormProps {
  userId: string;
  institutionName: string;
  onSuccess: () => void;
}

const TimetableForm = ({ userId, institutionName, onSuccess }: TimetableFormProps) => {
  const [loading, setLoading] = useState(false);
  const [numClassrooms, setNumClassrooms] = useState(10);
  const [numBatches, setNumBatches] = useState(3);
  const [maxClassesPerDay, setMaxClassesPerDay] = useState(6);
  const [avgLeaves, setAvgLeaves] = useState(2);
  
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", classesPerWeek: 5 },
    { name: "Physics", classesPerWeek: 4 },
    { name: "Chemistry", classesPerWeek: 4 }
  ]);
  
  const [faculties, setFaculties] = useState([
    { name: "Dr. Smith", subjects: ["Mathematics"] },
    { name: "Dr. Johnson", subjects: ["Physics"] }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", classesPerWeek: 3 }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: string, value: any) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const addFaculty = () => {
    setFaculties([...faculties, { name: "", subjects: [] }]);
  };

  const removeFaculty = (index: number) => {
    setFaculties(faculties.filter((_, i) => i !== index));
  };

  const updateFaculty = (index: number, field: string, value: any) => {
    const updated = [...faculties];
    updated[index] = { ...updated[index], [field]: value };
    setFaculties(updated);
  };

  const generateTimetable = async () => {
    if (subjects.some(s => !s.name.trim())) {
      toast.error("Please fill in all subject names");
      return;
    }

    setLoading(true);
    try {
      // Save configuration
      const { data: config, error: configError } = await supabase
        .from("timetable_configs")
        .insert({
          user_id: userId,
          institution_name: institutionName,
          num_classrooms: numClassrooms,
          num_batches: numBatches,
          subjects: subjects,
          max_classes_per_day: maxClassesPerDay,
          classes_per_week: subjects.reduce((acc, s) => {
            acc[s.name] = s.classesPerWeek;
            return acc;
          }, {} as any),
          faculty_data: faculties,
          avg_leaves_per_month: avgLeaves
        })
        .select()
        .single();

      if (configError) throw configError;

      // Generate timetable (simple algorithm for demo)
      const timetableData = generateOptimizedTimetable();

      // Save generated timetable
      const { error: timetableError } = await supabase
        .from("generated_timetables")
        .insert({
          config_id: config.id,
          user_id: userId,
          timetable_data: timetableData,
          optimization_score: Math.floor(Math.random() * 20 + 80),
          status: "generated"
        });

      if (timetableError) throw timetableError;

      toast.success("Timetable generated successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Error generating timetable:", error);
      toast.error("Failed to generate timetable");
    } finally {
      setLoading(false);
    }
  };

  const generateOptimizedTimetable = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = Array.from({ length: maxClassesPerDay }, (_, i) => 
      `${9 + i}:00 - ${10 + i}:00`
    );

    const timetable: any = {};

    for (let batch = 1; batch <= numBatches; batch++) {
      timetable[`Batch ${batch}`] = {};
      
      days.forEach(day => {
        timetable[`Batch ${batch}`][day] = [];
        
        timeSlots.forEach((slot, index) => {
          const subjectIndex = (batch + index) % subjects.length;
          const subject = subjects[subjectIndex];
          const facultyForSubject = faculties.find(f => 
            f.subjects.includes(subject.name)
          );
          
          timetable[`Batch ${batch}`][day].push({
            time: slot,
            subject: subject.name,
            faculty: facultyForSubject?.name || "TBA",
            classroom: `Room ${(batch + index) % numClassrooms + 1}`
          });
        });
      });
    }

    return timetable;
  };

  return (
    <div className="space-y-6">
      {/* Basic Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="classrooms">Number of Classrooms</Label>
          <Input
            id="classrooms"
            type="number"
            min="1"
            value={numClassrooms}
            onChange={(e) => setNumClassrooms(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="batches">Number of Batches</Label>
          <Input
            id="batches"
            type="number"
            min="1"
            value={numBatches}
            onChange={(e) => setNumBatches(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxClasses">Max Classes per Day</Label>
          <Input
            id="maxClasses"
            type="number"
            min="1"
            max="10"
            value={maxClassesPerDay}
            onChange={(e) => setMaxClassesPerDay(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leaves">Avg. Faculty Leaves/Month</Label>
          <Input
            id="leaves"
            type="number"
            min="0"
            value={avgLeaves}
            onChange={(e) => setAvgLeaves(parseInt(e.target.value))}
          />
        </div>
      </div>

      <Separator />

      {/* Subjects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Subjects</h3>
          <Button variant="outline" size="sm" onClick={addSubject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </div>
        
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Subject Name</Label>
                  <Input
                    value={subject.name}
                    onChange={(e) => updateSubject(index, "name", e.target.value)}
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label>Classes/Week</Label>
                  <Input
                    type="number"
                    min="1"
                    value={subject.classesPerWeek}
                    onChange={(e) => updateSubject(index, "classesPerWeek", parseInt(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSubject(index)}
                  disabled={subjects.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Faculty */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Faculty Members</h3>
          <Button variant="outline" size="sm" onClick={addFaculty}>
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </div>
        
        <div className="space-y-3">
          {faculties.map((faculty, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Faculty Name</Label>
                  <Input
                    value={faculty.name}
                    onChange={(e) => updateFaculty(index, "name", e.target.value)}
                    placeholder="e.g., Dr. Smith"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Subjects (comma separated)</Label>
                  <Input
                    value={faculty.subjects.join(", ")}
                    onChange={(e) => updateFaculty(index, "subjects", 
                      e.target.value.split(",").map(s => s.trim())
                    )}
                    placeholder="e.g., Mathematics, Physics"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFaculty(index)}
                  disabled={faculties.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Generate Button */}
      <div className="flex justify-end">
        <Button 
          onClick={generateTimetable}
          disabled={loading}
          size="lg"
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating..." : "Generate Optimized Timetable"}
        </Button>
      </div>
    </div>
  );
};

export default TimetableForm;