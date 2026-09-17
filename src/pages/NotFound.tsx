import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Seo title="Page not found" path={location.pathname} description="The requested page could not be found." noIndex />
      <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Page not found</p>
        <a href="/" className="text-foreground/70 hover:text-foreground underline">
          Return to Home
        </a>
      </div>
      </div>
    </>
  );
};

export default NotFound;
