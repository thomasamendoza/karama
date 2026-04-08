"use client";

import { signIn } from "next-auth/react";
import styles from "../page.module.css";

export function SignInPanel() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>Sign in with your Google account.</p>
        <button
          type="button"
          className={styles.button}
          onClick={() => signIn("google")}
        >
          Continue with Google
        </button>
      </section>
    </main>
  );
}
