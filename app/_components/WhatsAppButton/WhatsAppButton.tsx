import { Socials } from "../Icons/Socials";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className={styles.link}
    >
      <Socials.Whatsapp size={24} />
    </a>
  );
}
