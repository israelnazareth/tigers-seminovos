"use client";

import { useState, useCallback, useEffect } from "react";
import type { Vehicle } from "@/lib/vehicles";
import styles from "./VehicleDetailModal.module.css";
import Image from "next/image";
import { Arrow } from "../Icons/Arrows"

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onRequestQuote: () => void;
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  onRequestQuote,
}: VehicleDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = vehicle.images || [vehicle.image];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const waText = encodeURIComponent(
    `Olá! Tenho interesse no ${vehicle.name} (${vehicle.year}) cor ${vehicle.color}.`
  );
  const waHref = `https://wa.me/5500000000000?text=${waText}`;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Carousel */}
        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {images.length > 1 && (
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
                onClick={goToPrevious}
                type="button"
                aria-label="Imagem anterior"
              >
                <Arrow.Left size={16} />
              </button>
            )}

            <div className={styles.imageWrapper}>
              <Image
                src={images[currentIndex]}
                alt={`${vehicle.name} - Imagem ${currentIndex + 1}`}
                className={styles.carouselImage}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {images.length > 1 && (
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
                onClick={goToNext}
                type="button"
                aria-label="Próxima imagem"
              >
                <Arrow.Right size={16} />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.indicators}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentIndex ? styles.indicatorActive : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  type="button"
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Image Counter */}
          <div className={styles.imageCounter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Vehicle Info */}
        <div className={styles.content}>
          <h2 className={styles.vehicleName}>{vehicle.name}</h2>

          <div className={styles.mainDetails}>
            <span className={styles.detailItem}>
              <span className={styles.detailLabel}>Ano</span>
              <span className={styles.detailValue}>
                {vehicle.year}/{vehicle.year + 1}
              </span>
            </span>
            <span className={styles.detailDivider}>|</span>
            <span className={styles.detailItem}>
              <span className={styles.detailLabel}>Km</span>
              <span className={styles.detailValue}>
                {vehicle.km.toLocaleString("pt-BR")}
              </span>
            </span>
            <span className={styles.detailDivider}>|</span>
            <span className={styles.detailItem}>
              <span className={styles.detailLabel}>Cor</span>
              <span className={styles.detailValue}>{vehicle.color}</span>
            </span>
          </div>

          <div className={styles.specGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Combustível</span>
              <span className={styles.specValue}>{vehicle.fuel}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Blindagem</span>
              <span className={styles.specValue}>{vehicle.armor}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Carroceria</span>
              <span className={styles.specValue}>{vehicle.body}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Marca</span>
              <span className={styles.specValue}>{vehicle.make}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.quoteButton}
              onClick={onRequestQuote}
              type="button"
            >
              Solicitar Cotação
            </button>
            <a
              className={styles.whatsappLink}
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com um atendente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
