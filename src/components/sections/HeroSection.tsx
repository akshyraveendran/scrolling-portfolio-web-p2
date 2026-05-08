import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const frameCount = 240;
  const currentFrame = (index: number) =>
    `/man-sitting-frames/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

  // Preload images
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      // For mobile, only load the first frame
      const framesToLoad = window.innerWidth < 768 ? 1 : frameCount;

      for (let i = 1; i <= framesToLoad; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        const promise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img); // Still resolve on error to not block
        });
        promises.push(promise);
        loadedImages.push(img);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (!isLoaded || isMobile || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(airframes.frame);
    };

    const airframes = {
      frame: 0,
    };

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Object-fit: cover logic
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Scroll-driven animation
    const tl = gsap.to(airframes, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1, // Smooth syncing
        pin: true,
        onUpdate: (self) => {
          renderFrame(airframes.frame);
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoaded, isMobile, images]);

  // Initial fade-in
  useEffect(() => {
    if (isLoaded && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {isMobile ? (
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${currentFrame(1)})` }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
      )}

      {/* Optional: Add content over the animation if needed */}
      {!isLoaded && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
