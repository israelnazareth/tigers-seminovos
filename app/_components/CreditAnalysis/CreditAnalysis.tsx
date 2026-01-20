"use client";

import { useState } from "react";
import styles from "./CreditAnalysis.module.css";
import Image from "next/image";

function formatCPF(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11);
  
  // Aplica a máscara XXX.XXX.XXX-XX
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
  }
}

export default function CreditAnalysis() {
  const [cpf, setCpf] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = () => {
    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length === 11) {
      console.log("CPF enviado:", cleanCpf);
      // Aqui você pode adicionar a lógica de envio
    }
  };

  const isValid = cpf.replace(/\D/g, "").length === 11;

  return (
    <section className={styles.section}>
      <Image
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80"
        alt="Análise de crédito"
        className={styles.backgroundImage}
        width={1000}
        height={1000}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h2 className={styles.title}>
          Faça sua análise com a TIGERS
          <br />
          Seu crédito em primeiro lugar.
        </h2>

        <div className={styles.card}>
          <p className={styles.cardText}>
            Seu carro novo com
            <br />
            aprovação facilitada.
          </p>

          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="Digite aqui seu CPF"
            className={styles.input}
            inputMode="numeric"
          />

          <button
            type="button"
            className={styles.button}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}
