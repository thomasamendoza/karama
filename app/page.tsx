import { auth } from "@/auth";
import { getDisplayName } from "@/lib/profile-store";
import { SetDisplayNameForm } from "./_components/set-display-name-form";
import { SignInPanel } from "./_components/sign-in-panel";
import { WelcomeScreen } from "./_components/welcome-screen";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    return <SignInPanel />;
  }

  const displayName = await getDisplayName(session.user.id);
  if (!displayName) {
    return <SetDisplayNameForm />;
  }

  return <WelcomeScreen displayName={displayName} />;
}
