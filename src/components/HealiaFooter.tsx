import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import img from "@/assets/img.jpg";

const HealiaFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={img} alt="Healia" className="h-8 w-8 invert" />
              <span className="text-2xl font-bold"></span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Empowering better health through AI-powered telemedicine. 
              Your trusted partner in modern healthcare.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Heart className="h-4 w-4 text-red-400" />
              Made with care for better health
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform</h3>
            <div className="space-y-2">
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                AI Diagnosis
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Find Doctors
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Telemedicine
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Health Tracking
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                HIPAA Compliance
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Mail className="h-4 w-4" />
                supporthelia@gmail.com
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Phone className="h-4 w-4" />
               8667797620
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <MapPin className="h-4 w-4" />
                Redhills Chennai
              </div>
            </div>
            <Button variant="secondary" size="sm" className="mt-4">
              Emergency Contact
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/70">
            © 2024 Healia. All rights reserved. Your health, our priority.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/70">
            <span>HIPAA Compliant</span>
            <span>•</span>
            <span>SOC 2 Certified</span>
            <span>•</span>
            <span>FDA Cleared</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HealiaFooter;