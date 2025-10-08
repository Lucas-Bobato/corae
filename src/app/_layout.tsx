import { Slot, usePathname, useRouter } from "expo-router";
import "../styles/global.css";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ReviewsProvider } from "../contexts/ReviewsContext";
import { useEffect } from "react";

function AuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user) {
      if (!pathname?.startsWith("/auth")) {
        router.replace("/auth/login" as any);
      }
    }
    if (!loading && user && pathname?.startsWith("/auth")) {
      router.replace("/" as any);
    }
  }, [user, loading, pathname]);
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ReviewsProvider>
        <AuthGuard />
      </ReviewsProvider>
    </AuthProvider>
  );
}
