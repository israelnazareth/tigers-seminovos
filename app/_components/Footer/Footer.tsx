import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <ul className={styles.linksList}>
          <li>
            <Link href="/">Trabalhe conosco</Link>
          </li>
          <li>
            <Link href="/">Parceiro de negócio</Link>
          </li> 
          <li>
            <Link href="/">Termos de uso</Link>
          </li>
        </ul>
      </div>
      <span className={styles.copyright}>Tigers Seminovos © 2026</span>
    </footer>
  );
}
