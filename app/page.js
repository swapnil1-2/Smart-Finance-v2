import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />




      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="group relative text-3xl font-bold text-center mb-12 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_3px]">
              Everything you need to manage your finances
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-1 hover:ring-blue-200"
              >
                <CardContent className="space-y-4 pt-4">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="relative inline-block text-xl font-semibold cursor-pointer">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_2px]">
                      {feature.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="group relative text-3xl font-bold text-center mb-16 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_3px]">
              How It Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="group relative text-3xl font-bold text-center mb-16 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_3px]">
              What Our Users Say
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="group relative text-3xl font-bold text-white mb-4 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_3px]">
              Ready to Take Control of Your Finances?
            </span>
          </h2>

          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with Smart Finance.
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
