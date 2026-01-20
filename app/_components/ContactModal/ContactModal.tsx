"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/vehicles";
import styles from "./ContactModal.module.css";

type ModalState = "form" | "loading" | "success";

interface ContactModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function ContactModal({ vehicle, onClose }: ContactModalProps) {
  const [modalState, setModalState] = useState<ModalState>("form");
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    loja: "",
  });

  const isFormValid = formData.nome && formData.telefone && formData.email && formData.loja;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setModalState("loading");
    // Simula requisição
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setModalState("success");
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

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

        {modalState === "success" ? (
          <div className={styles.successContent}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Solicitação enviada!</h3>
            <p className={styles.successText}>
              Em breve um de nossos consultores entrará em contato para apresentar as melhores condições.
            </p>
            <button className={styles.successButton} onClick={onClose} type="button">
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Solicite sua cotação</h2>
            <div className={styles.divider} />

            <p className={styles.subtitle}>Dados para contato</p>

            <div className={styles.formFields}>
              <div className={styles.formRow}>
                <input
                  className={styles.formInput}
                  placeholder="NOME"
                  value={formData.nome}
                  onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                  disabled={modalState === "loading"}
                />
                <input
                  className={styles.formInput}
                  placeholder="TELEFONE"
                  value={formData.telefone}
                  onChange={(e) => setFormData((p) => ({ ...p, telefone: e.target.value }))}
                  disabled={modalState === "loading"}
                />
              </div>

              <input
                className={styles.formInput}
                placeholder="EMAIL"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                disabled={modalState === "loading"}
              />

              <select
                className={styles.formSelect}
                value={formData.loja}
                onChange={(e) => setFormData((p) => ({ ...p, loja: e.target.value }))}
                disabled={modalState === "loading"}
              >
                <option value="">LOJA MAIS PRÓXIMA</option>
                <option value="barra">Barra da Tijuca</option>
                <option value="botafogo">Botafogo</option>
                <option value="niteroi">Niterói</option>
              </select>
            </div>

            <div className={styles.vehicleDivider} />

            <div className={styles.vehicleInfo}>
              <h3 className={styles.vehicleName}>{vehicle.name.toUpperCase()}</h3>
              <p className={styles.vehicleDetails}>
                {vehicle.km.toLocaleString("pt-BR")} Km
                <span className={styles.separator}>|</span>
                {vehicle.year}/{vehicle.year + 1}
                <span className={styles.separator}>|</span>
                {vehicle.color}
              </p>
            </div>

            <button
              className={styles.submitButton}
              onClick={handleSubmit}
              disabled={!isFormValid || modalState === "loading"}
              type="button"
            >
              {modalState === "loading" ? (
                <span className={styles.spinner} />
              ) : (
                "Solicitar"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
