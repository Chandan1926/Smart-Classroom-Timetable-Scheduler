import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimetableViewerProps {
  timetable: any;
}

const TimetableViewer = ({ timetable }: TimetableViewerProps) => {
  const timetableData = timetable.timetable_data;
  const batches = Object.keys(timetableData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Generated Timetable</h2>
          <p className="text-muted-foreground">
            Optimization Score: {timetable.optimization_score}%
          </p>
        </div>
        <Badge className="text-sm px-4 py-2">
          {timetable.status}
        </Badge>
      </div>

      <Tabs defaultValue={batches[0]} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          {batches.map((batch) => (
            <TabsTrigger key={batch} value={batch}>
              {batch}
            </TabsTrigger>
          ))}
        </TabsList>

        {batches.map((batch) => (
          <TabsContent key={batch} value={batch} className="mt-6">
            <div className="space-y-4">
              {Object.entries(timetableData[batch]).map(([day, slots]: [string, any]) => (
                <Card key={day} className="p-4">
                  <h3 className="font-semibold text-lg mb-4 text-primary">
                    {day}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slots.map((slot: any, index: number) => (
                      <Card key={index} className="p-3 bg-gradient-subtle border-border">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            {slot.time}
                          </p>
                          <p className="font-semibold text-foreground">
                            {slot.subject}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{slot.faculty}</span>
                            <Badge variant="outline" className="text-xs">
                              {slot.classroom}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TimetableViewer;