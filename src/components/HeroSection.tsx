import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Calendar, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Activity className="h-4 w-4" />
                AI-Powered Healthcare
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Health,{" "}
                <span className="bg-gradient-medical bg-clip-text text-transparent">
                  AI-Enhanced
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience the future of healthcare with Healia's AI-powered telemedicine platform. 
                Get instant symptom assessments, connect with verified doctors, and manage your wellness journey.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/health-assessment">
                  <Heart className="h-5 w-5" />
                  Start Health Assessment
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/find-doctors">
                  <Users className="h-5 w-5" />
                  Find a Doctor
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-success" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-accent" />
                AI-Powered Diagnosis
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-secondary" />
                24/7 Available
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={heroImage}
                alt="Healthcare professionals using AI technology"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-white/90 backdrop-blur-sm border-0 shadow-medical animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-success animate-heartbeat" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Real-time Monitoring</p>
                  <p className="text-xs text-muted-foreground">AI Health Tracking</p>
                </div>
              </div>
            </Card>

            <Card className="absolute -bottom-4 -right-4 p-4 bg-white/90 backdrop-blur-sm border-0 shadow-medical animate-float delay-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Expert Doctors</p>
                  <p className="text-xs text-muted-foreground">Available 24/7</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;