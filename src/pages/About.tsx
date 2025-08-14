import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Shield, Globe } from "lucide-react";
import HealiaHeader from "@/components/HealiaHeader";
import HealiaFooter from "@/components/HealiaFooter";

const About = () => {
  return (
    <div className="min-h-screen">
      <HealiaHeader />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-6">
              About Healia
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing healthcare through AI-powered telemedicine, making quality medical care accessible to everyone, everywhere.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-medical bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-muted-foreground">
                      To bridge the gap between patients and healthcare providers through innovative AI technology, 
                      ensuring that quality medical care is accessible, affordable, and available 24/7 to communities worldwide.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-medical hover:shadow-medical-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Making healthcare accessible to rural and underserved communities through technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medical hover:shadow-medical-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Privacy</h3>
                  <p className="text-muted-foreground">
                    Your health data is protected with enterprise-grade security and HIPAA compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medical hover:shadow-medical-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-muted-foreground">
                    Continuously improving healthcare delivery through cutting-edge AI and technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a healthcare professional looking to expand your reach or a patient seeking 
              quality care, Healia is here to connect you with the right resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Find a Doctor
              </Button>
              <Button variant="outline" size="lg">
                Join as Provider
              </Button>
            </div>
          </section>
        </div>
      </main>

      <HealiaFooter />
    </div>
  );
};

export default About;