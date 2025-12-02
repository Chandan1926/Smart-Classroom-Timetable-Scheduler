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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Smart Classroom &
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Timetable Scheduler
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your institution's scheduling with AI-powered optimization. Create conflict-free timetables in minutes, not hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 shadow-elegant hover:shadow-glow transition-all text-base">
                  <Calendar className="h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="gap-2 text-base">
                Learn More
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-sm border-t border-border py-6 mt-auto">
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