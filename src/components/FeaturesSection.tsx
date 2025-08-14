import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Brain, Calendar, Heart, MessageCircle, Shield, Smartphone,
  Stethoscope, Zap, Clock, Star, FileText, Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Symptom Analysis",
    description: "Advanced AI analyzes your symptoms and provides instant health assessments with medical accuracy.",
    badge: "AI-Powered",
    color: "primary",
    action: (navigate: any) => navigate("/health-assessment")
  },
  {
    icon: Calendar,
    title: "Doctor Booking",
    description: "Find and book appointments with verified healthcare professionals based on your location and needs.",
    badge: "Instant Booking",
    color: "secondary",
    action: (navigate: any) => navigate("/find-doctors")
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "See which doctors are online and available for immediate consultations with live status updates.",
    badge: "Live Status",
    color: "accent",
    action: () => alert("Fetching live availability...")
  },
  {
    icon: MessageCircle,
    title: "Telemedicine Chat",
    description: "Secure video and text consultations with licensed doctors from the comfort of your home.",
    badge: "Secure",
    color: "success",
    action: (navigate: any) => navigate("/telemedicine")
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Receive digital prescriptions instantly and track your medication history securely.",
    badge: "Digital",
    color: "warning",
    action: (navigate: any) => navigate("/prescriptions")
  },
  {
    icon: Target,
    title: "Personalized Care",
    description: "AI-powered diet recommendations and calorie tracking tailored to your health goals.",
    badge: "Personalized",
    color: "primary",
    action: (navigate: any) => navigate("/personalized-care")
  },
  {
    icon: Star,
    title: "Doctor Reviews",
    description: "Read authentic reviews and ratings from patients to choose the best healthcare provider.",
    badge: "Verified Reviews",
    color: "secondary",
    action: (navigate: any) => navigate("/reviews")
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your health data is protected with enterprise-grade security and privacy compliance.",
    badge: "Secure",
    color: "success",
    action: () => alert("We are HIPAA compliant. Your data is safe.")
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Platform Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="bg-gradient-medical bg-clip-text text-transparent">
              Better Health
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Healia combines cutting-edge AI technology with human expertise to deliver 
            comprehensive healthcare solutions that fit your lifestyle.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                onClick={() => feature.action(navigate)}
                className="group cursor-pointer hover:shadow-medical transition-all duration-300 hover:scale-105 border-0 bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-${feature.color}/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Stethoscope className="h-4 w-4" />
            Trusted by healthcare professionals worldwide
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
