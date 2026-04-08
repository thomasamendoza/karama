"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export function SetDisplayNameForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const displayName = value.trim();
    if (!displayName) {
      setError("Please enter a display name.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName }),
      });
      const data: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Could not save display name.";
        setError(message);
        return;
      }
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Set your display name</h1>
        <p className={styles.subtitle}>
          This is shown when you use the app. You only need to do this once.
        </p>
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="displayName" className={styles.label}>
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            className={styles.input}
            placeholder="How should we greet you?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="nickname"
            disabled={pending}
          />
          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className={styles.button} disabled={pending}>
            {pending ? "Saving…" : "Continue"}
          </button>
        </form>
      </section>
    </main>
  );
}
