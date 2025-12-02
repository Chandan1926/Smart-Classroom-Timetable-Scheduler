import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, LogOut, History } from "lucide-react";
import { toast } from "sonner";
import TimetableForm from "@/components/TimetableForm";
import TimetableList from "@/components/TimetableList";

const Dashboard = () => {
  const navigate = useNavigate();
  // Simulating a user since we removed Supabase Auth
  const user = { id: "test-user-id", email: "demo@example.com" };
  const profile = { full_name: "Demo User", institution_name: "Azure School" };
  const [showForm, setShowForm] = useState(false);

  const handleSignOut = async () => {
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Smart Scheduler</h1>
                <p className="text-sm text-muted-foreground">{profile?.institution_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {profile?.full_name}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!showForm ? (
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Timetable Management</CardTitle>
                  </div>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Timetable
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Previous Timetables
                </CardTitle>
                <CardDescription>
                  View and manage timetables stored in Azure Database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimetableList userId={user.id} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generate New Timetable</CardTitle>
                </div>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TimetableForm 
                userId={user.id} 
                institutionName={profile.institution_name}
                onSuccess={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;