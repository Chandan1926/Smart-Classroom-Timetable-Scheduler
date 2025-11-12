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
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle2 className="h-4 w-4" />
              Government of Jharkhand Initiative
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Classroom &
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Timetable Scheduler</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              An intelligent scheduling solution for higher education institutions. 
              Optimize classroom utilization, faculty workload, and student satisfaction with AI-powered algorithms.
            </p>

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

            <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                NEP 2020 Compliant
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                Multi-Department Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built specifically for higher education institutions under the Department of 
              Higher and Technical Education, Jharkhand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Smart Scheduler?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Say goodbye to manual timetabling challenges. Our intelligent system handles 
                  the complexity of modern education scheduling, ensuring optimal results every time.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="p-8 shadow-xl bg-gradient-subtle border-border">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-primary mb-4">
                      <Calendar className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Ready to Optimize?</h3>
                    <p className="text-muted-foreground">
                      Join institutions across Jharkhand using our smart scheduling solution
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm font-medium">Classrooms Optimized</span>
                      <span className="text-2xl font-bold text-accent">10K+</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm font-medium">Faculty Hours Saved</span>
                      <span className="text-2xl font-bold text-accent">5K+</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm font-medium">Student Satisfaction</span>
                      <span className="text-2xl font-bold text-accent">95%</span>
                    </div>
                  </div>

                  <Link to="/auth" className="block">
                    <Button size="lg" className="w-full gap-2">
                      Start Scheduling Now
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Smart Scheduler</span>
            </div>
            
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>Government of Jharkhand</p>
              <p>Department of Higher and Technical Education</p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2025 Smart Scheduler. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;