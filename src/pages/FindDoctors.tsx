import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Clock, Video, MessageCircle, PhoneOff, Mic, MicOff, VideoIcon, VideoOff } from "lucide-react";
import HealiaHeader from "@/components/HealiaHeader";
import HealiaFooter from "@/components/HealiaFooter";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  avatar: string;
  status: "Online" | "Busy" | "Offline";
  nextAvailable: string;
  consultationFee: number;
  experience: string;
};

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    avatar: "",
    status: "Online",
    nextAvailable: "Available now",
    consultationFee: 75,
    experience: "12 years",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 89,
    location: "Los Angeles, CA",
    avatar: "",
    status: "Busy",
    nextAvailable: "Available in 20 mins",
    consultationFee: 120,
    experience: "15 years",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 156,
    location: "New York, NY",
    avatar: "",
    status: "Online",
    nextAvailable: "Available now",
    consultationFee: 90,
    experience: "8 years",
  },
];

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const { toast } = useToast();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-success text-success-foreground";
      case "Busy":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Mock WebRTC setup - in a real app you'd have proper signaling
  const setupCall = async () => {
    if (!selectedDoctor) return;

    setCallStatus("connecting");
    toast({
      title: "Connecting to doctor",
      description: `Starting video call with ${selectedDoctor.name}`,
    });

    try {
      // Mock delay for connection
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would:
      // 1. Create peer connection
      // 2. Get user media
      // 3. Set up signaling with your backend
      // 4. Handle ICE candidates, offers, answers

      // For this demo, we'll just mock the behavior
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Mock remote stream after delay
      setTimeout(() => {
        setCallStatus("active");
        toast({
          title: "Call connected",
          description: `You're now in consultation with ${selectedDoctor.name}`,
        });
      }, 2000);

    } catch (error) {
      console.error("Error setting up call:", error);
      setCallStatus("idle");
      toast({
        title: "Error",
        description: "Could not access camera/microphone",
        variant: "destructive",
      });
    }
  };

  const endCall = () => {
    // Clean up media streams
    if (localVideoRef.current?.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }

    setCallStatus("ended");
    toast({
      title: "Call ended",
      description: "Your consultation has ended",
    });

    // In a real app, you would:
    // 1. Close peer connection
    // 2. Send call end signal to backend
    // 3. Clean up resources
  };

  const scheduleAppointment = () => {
    if (!date || !timeSlot || !selectedDoctor) return;

    toast({
      title: "Appointment scheduled",
      description: `You have an appointment with ${selectedDoctor.name} on ${format(date, 'PPP')} at ${timeSlot}`,
    });

    setShowScheduleModal(false);
    setSelectedDoctor(null);
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (callStatus === "active") {
        endCall();
      }
    };
  }, [callStatus]);

  return (
    <div className="min-h-screen">
      <HealiaHeader />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-6">
              Find Your Doctor
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with qualified healthcare professionals. Book instant consultations or schedule appointments.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-medical mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors, specialties, or conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">All Specialties</Button>
                  <Button variant="outline" size="sm">Internal Medicine</Button>
                  <Button variant="outline" size="sm">Cardiology</Button>
                  <Button variant="outline" size="sm">Dermatology</Button>
                  <Button variant="outline" size="sm">Pediatrics</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Listings */}
          <div className="space-y-6">
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="border-0 shadow-medical hover:shadow-medical-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Info */}
                    <div className="flex gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{doctor.name}</h3>
                            <p className="text-primary font-medium">{doctor.specialty}</p>
                          </div>
                          <Badge className={getStatusColor(doctor.status)}>
                            {doctor.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{doctor.rating}</span>
                            <span>({doctor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{doctor.location}</span>
                          </div>
                          <div>
                            {doctor.experience} experience
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-success" />
                          <span className="text-success font-medium">{doctor.nextAvailable}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-between lg:w-80">
                      <div className="text-right mb-4">
                        <p className="text-2xl font-bold text-primary">${doctor.consultationFee}</p>
                        <p className="text-sm text-muted-foreground">consultation fee</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          variant="hero" 
                          className="w-full" 
                          disabled={doctor.status !== "Online"}
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setupCall();
                          }}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Video Consultation
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat Now
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setShowScheduleModal(true);
                          }}
                        >
                          Schedule Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Doctors
            </Button>
          </div>
        </div>
      </main>

      {/* Video Call Modal */}
      <Dialog open={callStatus !== "idle"} onOpenChange={(open) => {
        if (!open) endCall();
      }}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                style={{ display: callStatus === "active" ? "block" : "none" }}
              />
              
              {/* Connecting/loading state */}
              {callStatus === "connecting" && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Video className="h-12 w-12 mx-auto text-gray-400" />
                    </div>
                    <p className="mt-4 text-white">Connecting to {selectedDoctor?.name}...</p>
                  </div>
                </div>
              )}

              {/* Local Video */}
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="absolute bottom-4 right-4 w-32 h-32 rounded-lg object-cover border-2 border-white shadow-lg"
              />
            </div>

            {/* Call Controls */}
            <div className="bg-white p-4 flex justify-center gap-4">
              <Button
                variant={isMuted ? "outline" : "secondary"}
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isVideoOff ? "outline" : "secondary"}
                size="icon"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <VideoIcon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="destructive"
                className="rounded-full p-3"
                onClick={endCall}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Book an appointment with {selectedDoctor?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < addDays(new Date(), -1)}
                className="rounded-md border"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Select Time</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? "default" : "outline"}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={scheduleAppointment}
              disabled={!date || !timeSlot}
            >
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <HealiaFooter />
    </div>
  );
};

export default FindDoctors;