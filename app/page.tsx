"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [draftName, setDraftName] = useState("");
  const [loggedInName, setLoggedInName] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitizedName = draftName.trim();
    if (!sanitizedName) {
      return;
    }
    setLoggedInName(sanitizedName);
  };

  if (loggedInName) {
    return (
      <main className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>Welcome, {loggedInName}!</h1>
          <p className={styles.subtitle}>You are now logged in.</p>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              setLoggedInName("");
              setDraftName("");
            }}
          >
            Log out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>Enter your name to continue.</p>
        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            placeholder="Your name"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            autoComplete="name"
          />
          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}
