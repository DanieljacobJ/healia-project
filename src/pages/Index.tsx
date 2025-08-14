import HealiaHeader from "@/components/HealiaHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import HealiaFooter from "@/components/HealiaFooter";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, Apple, Activity, 
  Moon, Droplet, Sun, 
  Brain, Scale, Eye,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useRef } from "react";

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

const healthTips = [
  {
    title: "Hydration",
    description: "Start with lemon water for better digestion",
    icon: <Droplet className="h-8 w-8 text-blue-600" />,
    bg: "bg-blue-50",
    border: "border border-blue-100"
  },
  {
    title: "Active Living",
    description: "Walk while you take calls for extra steps",
    icon: <Activity className="h-8 w-8 text-green-600" />,
    bg: "bg-green-50",
    border: "border border-green-100"
  },
  {
    title: "Balanced Diet",
    description: "Fill half your plate with colorful veggies",
    icon: <Apple className="h-8 w-8 text-red-600" />,
    bg: "bg-red-50",
    border: "border border-red-100"
  },
  {
    title: "Quality Sleep",
    description: "Create a bedtime ritual for better rest",
    icon: <Moon className="h-8 w-8 text-indigo-600" />,
    bg: "bg-indigo-50",
    border: "border border-indigo-100"
  },
  {
    title: "Mindfulness",
    description: "Practice 5-minute meditation sessions",
    icon: <Brain className="h-8 w-8 text-purple-600" />,
    bg: "bg-purple-50",
    border: "border border-purple-100"
  }
];

const Index = () => {
  const swiperRef = useRef(null);

  return (
    <div className="min-h-screen">
      <HealiaHeader />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {/* Subtle Health Slider */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            Wellness Tips
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-lg mx-auto">
            Simple practices for better health
          </p>
          
          <div className="relative max-w-3xl mx-auto">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, EffectCreative, Navigation]}
              effect={'creative'}
              creativeEffect={{
                prev: {
                  shadow: false,
                  translate: ['-20%', 0, -100],
                },
                next: {
                  translate: ['20%', 0, 0],
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={600}
              loop={true}
              grabCursor={true}
              className="!overflow-visible"
            >
              {healthTips.map((tip, index) => (
                <SwiperSlide key={index}>
                  <div className={`${tip.bg} ${tip.border} h-48 rounded-xl shadow-sm p-6 flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-all`}>
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-lg ${tip.bg} flex items-center justify-center mb-4`}>
                        {tip.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button 
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <button 
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </section>

      <HealiaFooter />
    </div>
  );
};

export default Index;