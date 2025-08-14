import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Clock, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Patients",
    description: "Trust our platform"
  },
  {
    icon: Activity,
    value: "98%",
    label: "Accuracy Rate",
    description: "AI diagnosis precision"
  },
  {
    icon: Clock,
    value: "< 2 min",
    label: "Average Response",
    description: "Doctor availability"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Patient Rating",
    description: "User satisfaction"
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted Healthcare Platform
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of patients who have transformed their healthcare experience with Healia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;