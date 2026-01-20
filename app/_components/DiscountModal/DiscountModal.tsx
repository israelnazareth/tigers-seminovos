"use client";

import { useState } from "react";
import styles from "./DiscountModal.module.css";
import Image from "next/image";

type ModalState = "open" | "minimized" | "loading" | "success";

export default function DiscountModal() {
  const [modalState, setModalState] = useState<ModalState>("open");
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
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      loja: "",
    });
  };

  return (
    <>
      {/* Modal minimizado */}
      {modalState === "minimized" && (
        <button
          className={styles.modalMinimized}
          onClick={() => setModalState("open")}
          type="button"
        >
          <span className={styles.modalMinimizedIcon}>🎁</span>
          <span className={styles.modalMinimizedText}>Ganhe desconto!</span>
        </button>
      )}

      {/* Modal aberto */}
      {(modalState === "open" || modalState === "loading" || modalState === "success") && (
        <div className={styles.formCard}>
          <button
            className={styles.closeButton}
            onClick={() => setModalState("minimized")}
            type="button"
            aria-label="Minimizar"
          >
            ✕
          </button>

          {modalState === "success" ? (
            <div className={styles.successContent}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Parabéns!</h3>
              <p className={styles.successText}>
                Sua solicitação foi enviada com sucesso. Em breve um de nossos consultores entrará em contato.
              </p>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>
                GANHE UM<br />DESCONTO DE ATÉ
              </h3>
              <p className={styles.formDiscount}>R$ 3.000,00</p>

              <div className={styles.vehicleImage}>
                <Image
                  src="https://www.publicdomainpictures.net/pictures/620000/nahled/car-bmw-passenger-car-png.png"
                  alt="Carro BMW"
                  className={styles.vehicleImg}
                  width={200}
                  height={200}
                  priority
                />
              </div>

              <div className={styles.formFields}>
                <input
                  className={styles.formInput}
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
                  disabled={modalState === "loading"}
                />
                <input
                  className={styles.formInput}
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData((p) => ({ ...p, telefone: e.target.value }))}
                  disabled={modalState === "loading"}
                />
                <input
                  className={styles.formInput}
                  placeholder="Email"
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
                  <option value="">Selecione uma loja</option>
                  <option value="barra">Barra da Tijuca</option>
                  <option value="botafogo">Botafogo</option>
                  <option value="niteroi">Niterói</option>
                </select>
                <button
                  className={styles.formButton}
                  onClick={handleSubmit}
                  disabled={!isFormValid || modalState === "loading"}
                  type="button"
                >
                  {modalState === "loading" ? (
                    <span className={styles.spinner} />
                  ) : (
                    "SOLICITAR"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
