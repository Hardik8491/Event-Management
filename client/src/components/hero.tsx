import Link from "next/link";
import React from "react";
import { useEffect } from "react";

const HeroBanner = () => {
  useEffect(() => {
    // Add custom CSS directly if needed
    const style = document.createElement('style');
    style.innerHTML = `
      @media (min-width: 768px) and (max-width: 899px) {
        .hero_animation {
          /* Adjust circle sizes and positions for tablets in this range */
          /* Example adjustments */
          width: 30vh;
          height: 30vh;
          top: 20%;
          left: -10%;
        }
        .circle-medium {
          width: 35vh;
          height: 35vh;
          top: 30%;
          left: 5%;
        }
        .circle-large {
          width: 45vh;
          height: 45vh;
          top: 40%;
          left: 15%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative flex  w-full items-center justify-center  dark:bg-gradient-to-r from-slate-900/10 to-stone-800/50">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-8 px-4 md:flex-row">
        {/* Text Content */}
        <div className="relative flex flex-col items-start justify-center space-y-6 dark:text-white">
          {/* Background animation circle */}
          <div className="absolute inset-0 hero_animation xl:h-[50vh] xl:w-[50vh] lg:h-[40vh] lg:w-[40vh] md:h-[30vh] md:w-[30vh] h-[25vh] w-[25vh] blur-2xl rounded-full border opacity-50" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Unlock Your Potential with Our Education Platform
          </h1>
          <p className="max-w-md text-lg md:text-xl">
            Discover a world of knowledge and opportunities with our cutting-edge education platform. Empower your learning journey today.
          </p>
          <div className="flex gap-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:max-w-md max-w-lg  md:mt-0">
          {/* Background animation circles */}
          <div className="absolute hidden inset-0 lg:flex xl:h-10 xl:w-10 h-8 w-8 hero_animations rounded-full bg-gradient-to-tl  bg-blend-multiply from-green-700 to-green-500/50  border dark:bg-white/20 opacity-50 shadow-sm" />
          <div className="absolute inset-0 lg:flex lg:h-[48vh] lg:w-[48vh] h-[40vh] w-[40vh] top-32 ml-12 lg:ml-10 lg:top-[100px] hero_animation rounded-full bg-green-500  border dark:bg-white/20 opacity-50 shadow-sm circle-medium" />
          <div className="absolute inset-0 hero_animation lg:h-[60vh] lg:w-[60vh]  top-[80px] xl:h-[75vh] xl:w-[75vh] blur-2xl rounded-full border opacity-50 -left-10 circle-medium" />

          <img
            src="/hero-img.png"
            width={500}
            height={500}
            alt="Hero Image"
            className="relative z-10 rounded-xl p-2 object-"
            style={{ aspectRatio: "500 / 500"}}
          />
          <div className="absolute hidden lg:flex xl:ml-[400px] top-[400px] ml-[320px] inset-0 xl:h-10 xl:w-10 h-8 w-8 hero_animations rounded-full bg-gradient-to-tl  bg-blend-multiply from-green-700 to-green-500/50  border dark:bg-white/20 opacity-50 shadow-sm" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
