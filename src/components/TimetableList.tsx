import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import TimetableViewer from "./TimetableViewer";

interface TimetableListProps {
  userId: string;
}

const TimetableList = ({ userId }: TimetableListProps) => {
  const [timetables, setTimetables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimetable, setSelectedTimetable] = useState<any>(null);

  useEffect(() => {
    fetchTimetables();
  }, [userId]);

  const fetchTimetables = async () => {
    try {
      const response = await fetch('/api/timetables', {
        headers: { 'x-user-id': userId }
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTimetables(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTimetable = async (timetableId: string) => {
    try {
      // THIS IS THE NEW CODE TO ENABLE DELETING
      const response = await fetch(`/api/timetables?id=${timetableId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': userId
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      toast.success("Timetable deleted successfully");
      // Remove the item from the screen immediately
      setTimetables((prev) => prev.filter((t) => t.id !== timetableId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete timetable");
    }
  };

  const downloadTimetable = (timetable: any) => {
    const dataStr = JSON.stringify(timetable.timetable_data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `timetable_${timetable.id}.json`;
    link.click();
    toast.success("Timetable downloaded");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (selectedTimetable) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setSelectedTimetable(null)}>Back</Button>
        <TimetableViewer timetable={selectedTimetable} />
      </div>
    );
  }

  if (timetables.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No timetables yet. Generate one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {timetables.map((timetable) => (
        <Card key={timetable.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {timetable.timetable_configs?.institution_name || "Timetable"}
                </h4>
                <Badge variant="secondary">{timetable.status || "Generated"}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Score: {timetable.optimization_score}% • Created: {new Date(timetable.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTimetable(timetable)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadTimetable(timetable)}>
                <Download className="h-4 w-4" />
              </Button>
              {/* DELETE BUTTON */}
              <Button variant="destructive" size="sm" onClick={() => deleteTimetable(timetable.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TimetableList;