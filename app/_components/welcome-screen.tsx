import styles from "../page.module.css";

export function WelcomeScreen({ displayName }: { displayName: string }) {
  return (
    <main className={styles.welcome}>
      <p className={styles.welcomeText}>Welcome, {displayName}</p>
    </main>
  );
}
