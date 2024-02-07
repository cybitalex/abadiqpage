// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../app/styles.css"; // Adjust the path to match your project structure

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Use useEffect to listen for route changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Trigger any transition animation or logic here if needed
      console.log(`Route changed to: ${url}`);
    };

    // Subscribe to the router's route change event
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup the event listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
