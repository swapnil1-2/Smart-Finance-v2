"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-40 pb-24 px-4 bg-gray-50">
      <div className="container mx-auto text-center">

        {/* Gradient Heading */}
        <h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px]
                     font-extrabold tracking-tight leading-[1.05] pb-6"
          style={{
            background:
              "linear-gradient(90deg, #1e8a61 0%, #4338ca 50%, #02220d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Manage Your Finances <br /> with Intelligence
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button
  size="lg"
  className="px-10 py-6 
             bg-black text-white font-semibold
             rounded-xl shadow-md
             transition-all duration-300
             hover:bg-gradient-to-r 
             hover:from-[#1e8a61] 
             hover:via-[#4338ca] 
             hover:to-[#02220d]
             hover:text-white
             hover:shadow-lg"
>
  Get Started
</Button>

          </Link>
        </div>

        {/* Image Card */}
        <div className="mt-20 px-4">
          <div className="rounded-2xl shadow-2xl p-4 bg-white">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-xl mx-auto"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
