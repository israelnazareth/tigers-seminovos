"use client";

import { useState } from "react";
import Footer from "../_components/Footer/Footer";
import styles from "./page.module.css";
import Image from "next/image";

export default function SchedulePage() {
  const mosaic = [
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80",
  ] as const;

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    loja: "",
    data: "",
    hora: "",
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("sobrenome", form.sobrenome);
    formData.append("email", form.email);
    formData.append("telefone", form.telefone);
    formData.append("loja", form.loja);
    formData.append("data", form.data);
    formData.append("hora", form.hora);
  };

  return (
    <section className={styles.pageSection}>
      <div className={styles.mosaicBackground}>
        <div className={styles.mosaicGrid}>
          {mosaic.map((src) => (
            <Image key={src} src={src} alt="" className={styles.mosaicImage} width={500} height={500} />
          ))}
        </div>
        <div className={styles.mosaicOverlay} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          <div className={styles.formColumn}>
            <h1 className={styles.formTitle}>Agende sua visita</h1>

            <div className={styles.sectionLabel}>Dados pessoais</div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <input
                  value={form.nome}
                  onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                  placeholder="Nome"
                  required
                  type="text"
                  className={styles.formInput}
                />
                <input
                  value={form.sobrenome}
                  onChange={(e) => setForm((p) => ({ ...p, sobrenome: e.target.value }))}
                  placeholder="Sobrenome"
                  required
                  type="text"
                  className={styles.formInput}
                />
              </div>

              <div className={`${styles.formRow} ${styles.formRowMargin}`}>
                <input
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                  className={styles.formInput}
                  required
                  type="email"
                />
                <input
                  value={form.telefone}
                  onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))}
                  placeholder="Telefone"
                  className={styles.formInput}
                  required
                  type="tel"
                />
              </div>

              <div className={styles.storeSection}>
                <div className={styles.sectionLabel}>Loja</div>
                <select
                  value={form.loja}
                  onChange={(e) => setForm((p) => ({ ...p, loja: e.target.value }))}
                  className={styles.storeSelect}
                >
                  <option value="">Selecione uma loja</option>
                  <option value="barra">Barra da Tijuca</option>
                  <option value="botafogo">Botafogo</option>
                  <option value="niteroi">Niterói</option>
                </select>
              </div>

              <div className={`${styles.formRow} ${styles.formRowMargin}`}>
                <input
                  type="date"
                  value={form.data}
                  onChange={(e) => setForm((p) => ({ ...p, data: e.target.value }))}
                  className={styles.formInput}
                />
                <input
                  type="time"
                  value={form.hora}
                  onChange={(e) => setForm((p) => ({ ...p, hora: e.target.value }))}
                  className={styles.formInput}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
              >
                Agendar visita <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>

          <div className={styles.middleColumn}>
            <h2 className={styles.middleTitle}>
              A TIGERS ESTÁ COM VOCÊ EM CADA ENCONTRO
            </h2>
            <p className={styles.middleText}>
            Na TIGERS, cada visita é pensada para você. Um momento exclusivo, com atendimento humano e atenção aos detalhes que realmente importam. Aqui, você não é apenas mais um horário na agenda — é alguém com planos, dúvidas e expectativas que merecem ser respeitadas. Agende quando for melhor para você. Estamos prontos para receber, ouvir e ajudar no que for preciso.
            </p>
          </div>

        </div>

        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </div>
    </section>
  );
}
