import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nox' Blog | Scherp in de Struiken",
  description: "Artikelen en notities uit het bos.",
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      {/* Site titel boven hero */}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <div className={styles.media}>
            <Image
              src="/images/nox-schrijft-hero.png"
              alt="Nox schrijft in zijn dagboek"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div aria-hidden="true" className={styles.fade} />
      </section>

      {/* Titel onder hero */}
      <div className={styles.blogTitle}>
        Nox' Blog
      </div>

      {/* Content */}
      <main className={styles.content}>
        {/* TODO: posts */}
      </main>
    </div>
  );
}
