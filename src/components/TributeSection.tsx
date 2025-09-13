"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const sliderVideoIds = [
  "08DCoUv-RQM",
  "08DCoUv-RQM",
  "08DCoUv-RQM",
  "08DCoUv-RQM",
  "08DCoUv-RQM",
  "08DCoUv-RQM",
];

export default function TributeSection() {
  const swiperRef = useRef<any>(null);
  const playersRef = useRef<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pause all videos except the one at index
  const pauseOtherVideos = (activeIndex: number) => {
    playersRef.current.forEach((p, idx) => {
      if (idx !== activeIndex) {
        try {
          p?.pauseVideo?.();
        } catch (e) {}
      }
    });
  };

  useEffect(() => {
    let mounted = true;

    const loadYouTubeAPI = () =>
      new Promise<any>((resolve) => {
        if (typeof window === "undefined") return resolve(null);
        if ((window as any).YT && (window as any).YT.Player) return resolve((window as any).YT);
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        (window as any).onYouTubeIframeAPIReady = () => resolve((window as any).YT);
      });

    loadYouTubeAPI().then((YT) => {
      if (!mounted || !YT) return;

      const onStateChange = (e: any) => {
        if (e.data === YT.PlayerState.PLAYING) {
          const playerIndex = playersRef.current.findIndex((p) => p === e.target);
          pauseOtherVideos(playerIndex); // ✅ stop other videos
          setIsPlaying(true);
          swiperRef.current?.autoplay?.stop?.();
        } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
          setIsPlaying(false);
          swiperRef.current?.autoplay?.start?.();
        }
      };

      sliderVideoIds.forEach((_, idx) => {
        try {
          if (!playersRef.current[idx]) {
            playersRef.current[idx] = new YT.Player(`player-${idx}`, {
              events: { onStateChange },
            });
          }
        } catch {
          setTimeout(() => {
            if (!mounted) return;
            try {
              if (!playersRef.current[idx] && document.getElementById(`player-${idx}`)) {
                playersRef.current[idx] = new YT.Player(`player-${idx}`, {
                  events: { onStateChange },
                });
              }
            } catch {}
          }, 300);
        }
      });
    });

    return () => {
      mounted = false;
      playersRef.current.forEach((p) => {
        try {
          p?.destroy?.();
        } catch {}
      });
      playersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.allowTouchMove = !isPlaying;
  }, [isPlaying]);

  const pauseAllVideos = () => {
    playersRef.current.forEach((p) => {
      try {
        p?.pauseVideo?.();
      } catch {}
    });
  };

  return (
    <div className="pt-16 lg:pt-10 lg:pb-20 px-5 lg:px-0">
      <div className="mx-auto">
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Autoplay]}
          className="mySwiper mb-12"
          onSlideChange={() => pauseAllVideos()} // pause when slide changes
        >
          {sliderVideoIds.map((id, index) => (
            <SwiperSlide key={index} className="transition-transform duration-500">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  id={`player-${index}`}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1&origin=${
                    typeof window !== "undefined" ? window.location.origin : ""
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .mySwiper .swiper-slide {
          transform: scale(0.5);
          transition: transform 0.5s ease;
        }
        .mySwiper .swiper-slide-active {
          transform: scale(1.2);
          z-index: 10;
          border-radius: 12px;
        }
        .mySwiper .swiper-slide-next,
        .mySwiper .swiper-slide-prev {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
