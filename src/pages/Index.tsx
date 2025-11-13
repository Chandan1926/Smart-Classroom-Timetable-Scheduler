import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle2, BarChart3, Users, Clock, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Optimization",
      description: "Advanced algorithms ensure maximum utilization of classrooms and faculty time"
    },
    {
      icon: Users,
      title: "Multi-Department Support",
      description: "Seamlessly manage timetables across multiple departments and shifts"
    },
    {
      icon: Clock,
      title: "Real-Time Adjustments",
      description: "Handle faculty leaves and schedule changes with intelligent rearrangement"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track utilization metrics and identify optimization opportunities"
    }
  ];

  const benefits = [
    "Minimize scheduling conflicts and classroom clashes",
    "Optimal faculty workload distribution",
    "Support for elective courses and flexible learning (NEP 2020)",
    "Quick generation of multiple timetable variants",
    "Review and approval workflow for administrators",
    "Export timetables in multiple formats"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Classroom &
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Timetable Scheduler</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/auth">
                <Button size="lg" className="gap-2 shadow-lg">
                  <Calendar className="h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-sm text-muted-foreground">
              © 2025 Smart Classroom & Timetable Scheduler. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;