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
      // Call your new Azure Function
      const response = await fetch('/api/timetables', {
        method: 'GET',
        headers: {
          'x-user-id': userId // Pass the user ID for filtering
        }
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setTimetables(data || []);
    } catch (error: any) {
      console.error("Error fetching timetables:", error);
      toast.error("Failed to load timetables");
    } finally {
      setLoading(false);
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

  // Note: Delete functionality requires adding a DELETE handler to your Azure Function.
  // For now, this is a placeholder.
  const deleteTimetable = async (timetableId: string) => {
    toast.error("Delete functionality not yet implemented in API");
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading timetables...</p>
      </div>
    );
  }

  if (selectedTimetable) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedTimetable(null)}
        >
          Back to List
        </Button>
        <TimetableViewer timetable={selectedTimetable} />
      </div>
    );
  }

  if (timetables.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No timetables yet</h3>
        <p className="text-muted-foreground">
          Generate your first optimized timetable to get started
        </p>
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
                {/* Note: We handle missing config data gracefully with ? checks */}
                <h4 className="font-semibold">
                  {timetable.timetable_configs?.institution_name || "Timetable"}
                </h4>
                <Badge variant={timetable.status === "approved" ? "default" : "secondary"}>
                  {timetable.status || "Generated"}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                   Score: {timetable.optimization_score}%
                </p>
                <p className="text-xs">
                  Created: {new Date(timetable.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTimetable(timetable)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadTimetable(timetable)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTimetable(timetable.id)}
              >
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