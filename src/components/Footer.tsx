import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-6 mt-auto">
      <div className="w-full max-w-[1400px] mx-auto xl:border-l px-4 text-center">
        <div className="mb-2">
          <Link 
            to="/impressum" 
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Impressum
          </Link>
        </div>
        <p className="text-muted-foreground">
          © {currentYear} Fractured Within
        </p>
      </div>
    </footer>
  );
};

export default Footer;