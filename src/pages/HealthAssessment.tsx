import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import HealiaHeader from "@/components/HealiaHeader";
import HealiaFooter from "@/components/HealiaFooter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the shape of the analysis result from the backend
interface AnalysisResult {
  prediction?: number[];
  error?: string;
}

const HealthAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState("");
  const [urgency, setUrgency] = useState("");
  const [duration, setDuration] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleMedicalHistoryChange = (condition: string, checked: boolean) => {
    if (checked) {
      setMedicalHistory([...medicalHistory, condition]);
    } else {
      setMedicalHistory(medicalHistory.filter(item => item !== condition));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setAnalysisResult(null);
    setApiError(null);

    // Collect all form data into a single object
    const assessmentData = {
      symptoms: symptoms,
      urgency: urgency,
      duration: duration,
      medicalHistory: medicalHistory,
    };

    try {
      // Send the data to your Flask backend
      const response = await fetch('http://127.0.0.1:5000/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);

      toast({
        title: "Assessment Complete!",
        description: "Analysis is ready. See results below.",
      });

    } catch (error) {
      console.error("Failed to fetch:", error);
      setApiError("Failed to connect to the analysis server. Please check the server and try again.");
      toast({
        title: "Error!",
        description: "Failed to submit assessment. Please check the console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Describe Your Symptoms</h2>
              <p className="text-muted-foreground">Tell us what you're experiencing in your own words</p>
            </div>
            <div>
              <Label htmlFor="symptoms">What symptoms are you experiencing?</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms in detail... (e.g., headache, fever, cough, pain location, etc.)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={5}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Urgency Level</h2>
              <p className="text-muted-foreground">How urgent do you feel your condition is?</p>
            </div>
            <RadioGroup value={urgency} onValueChange={setUrgency}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="mild" id="mild" />
                <Label htmlFor="mild" className="flex-1">
                  <div className="font-medium">Mild</div>
                  <div className="text-sm text-muted-foreground">No immediate concern, can wait</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="moderate" id="moderate" />
                <Label htmlFor="moderate" className="flex-1">
                  <div className="font-medium">Moderate</div>
                  <div className="text-sm text-muted-foreground">Concerning, would like to address soon</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="flex-1">
                  <div className="font-medium">Urgent</div>
                  <div className="text-sm text-muted-foreground">Need attention today</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg border-destructive">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="flex-1">
                  <div className="font-medium text-destructive">Emergency</div>
                  <div className="text-sm text-muted-foreground">Call 911 or go to ER immediately</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Symptom Duration</h2>
              <p className="text-muted-foreground">How long have you been experiencing these symptoms?</p>
            </div>
            <RadioGroup value={duration} onValueChange={setDuration}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="hours" id="hours" />
                <Label htmlFor="hours">A few hours</Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="1-2days" id="1-2days" />
                <Label htmlFor="1-2days">1-2 days</Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="3-7days" id="3-7days" />
                <Label htmlFor="3-7days">3-7 days</Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="1-2weeks" id="1-2weeks" />
                <Label htmlFor="1-2weeks">1-2 weeks</Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="longer" id="longer" />
                <Label htmlFor="longer">More than 2 weeks</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Medical History</h2>
              <p className="text-muted-foreground">Select any conditions that apply to you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Diabetes", "High Blood Pressure", "Heart Disease", "Asthma", "Allergies", "Depression", "Anxiety", "Arthritis"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Checkbox
                    id={condition}
                    checked={medicalHistory.includes(condition)}
                    onCheckedChange={(checked) => handleMedicalHistoryChange(condition, checked as boolean)}
                  />
                  <Label htmlFor={condition}>{condition}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  
  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-6 text-gray-500">
          <Loader2 className="animate-spin h-5 w-5 mr-3 text-indigo-500" />
          Analyzing your symptoms...
        </div>
      );
    }
    
    if (apiError) {
      return (
        <div className="p-6 text-red-600 bg-red-50 rounded-lg border border-red-200">
          <p className="font-semibold">Error:</p>
          <p>{apiError}</p>
        </div>
      );
    }
    
    if (analysisResult) {
      return (
        <div className="p-6 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap">
          <p className="font-semibold">Analysis Complete:</p>
          <p>Prediction: {analysisResult.prediction}</p>
        </div>
      );
    }
    
    return null;
  }

  return (
    <div className="min-h-screen">
      <HealiaHeader />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-4">
                AI Health Assessment
              </h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Assessment Form */}
          <Card className="border-0 shadow-medical">
            <CardContent className="p-8">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isLoading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={isLoading || !symptoms || !urgency || !duration}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Complete Assessment
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !symptoms) ||
                      (currentStep === 2 && !urgency) ||
                      (currentStep === 3 && !duration) ||
                      isLoading
                    }
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Result and Disclaimer */}
          <div className="mt-6">
            {renderResult()}
            <Card className="mt-6 border-warning/20 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-warning-foreground">Medical Disclaimer</p>
                    <p className="text-muted-foreground mt-1">
                      This assessment is for informational purposes only and does not replace professional medical advice. 
                      If you're experiencing a medical emergency, call 911 immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <HealiaFooter />
    </div>
  );
};

export default HealthAssessment;
