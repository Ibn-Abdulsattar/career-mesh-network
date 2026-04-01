import useAppStore from "@/store/useAppStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated, _hasHydrated } = useAppStore();
    useEffect(() => {
      if (!isAuthenticated && _hasHydrated) {
        router.push("/auth");
      }
    }, [isAuthenticated, _hasHydrated, router]);

    if (isAuthenticated) {
      router.push("/dashboard");
    }

    return <Component {...props} />;
  };
};
export default withAuth;
