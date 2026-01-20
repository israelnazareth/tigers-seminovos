"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import CreditAnalysis from "./_components/CreditAnalysis/CreditAnalysis";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./_components/Icons/Arrows";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=2400&q=80",
    badge: "IPVA Grátis",
    title: "Blindados à pronta entrega",
    subtitle: "O conforto e a segurança que você precisa",
  },
  {
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=2400&q=80",
    badge: "Primeira parcela só depois da Páscoa",
    title: "Financiamento facilitado",
    subtitle: "Taxas especiais e aprovação rápida",
  },
  {
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=80",
    badge: "Entrada a partir de R$ 5.000",
    title: "Motos e carros seminovos",
    subtitle: "As melhores ofertas você encontra aqui",
  },
] as const;

const categoryCards = [
  {
    label: "Utilitários",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "SUV",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Sedan",
    img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "Hatch",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export default function HomePage() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const handleSwiper = (instance: SwiperType) => {
    swiperRef.current = instance;
    setSwiperReady(true);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    const nav = swiper.params.navigation;
    if (nav && typeof nav !== "boolean") {
      nav.prevEl = prevRef.current;
      nav.nextEl = nextRef.current;
    }

    swiper.navigation?.destroy?.();
    swiper.navigation?.init?.();
    swiper.navigation?.update?.();
  }, [swiperReady]);

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <button
          ref={prevRef}
          aria-label="Slide anterior"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          type="button"
        >
          <Arrow.Left size={24} />
        </button>
        <button
          ref={nextRef}
          aria-label="Próximo slide"
          className={`${styles.navButton} ${styles.navButtonNext}`}
          type="button"
        >
          <Arrow.Right size={24} />
        </button>

        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          onSwiper={handleSwiper}
          className={styles.swiper}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.image} className={styles.swiperSlide}>
              <Image src={slide.image} alt="Veículo Tigers" className={styles.slideImage} width={1000} height={1000} />
              <div className={styles.slideOverlay} />
              <div className={styles.slideContent}>
                <span className={styles.slideBadge}>{slide.badge}</span>
                <h1 className={styles.slideTitle}>{slide.title}</h1>
                <p className={styles.slideSubtitle}>{slide.subtitle}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className={styles.categorySection}>
        {categoryCards.map((item) => (
          <Link href="/catalogo" key={item.label} className={styles.categoryLink}>
            <div className={styles.categoryCard}>
              <Image src={item.img} alt={item.label} className={styles.categoryImage} width={1000} height={1000} />
              <div className={styles.categoryOverlay}>
                <span className={styles.categoryLabel}>{item.label}</span>
                <button className={styles.categoryButton}>Conferir</button>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoContainer}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            src="/video-home.mp4"
          />
        </div>
      </section>

      <CreditAnalysis />

    </div>
  );
}
