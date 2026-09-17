import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/optimized/pocket-logo.webp";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/shows", label: "Shows" },
    { path: "/merch", label: "Merch" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/85 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
            aria-label="Fractured Within home"
          >
            <img
              src={Logo}
              alt=""
              className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              width="44"
              height="44"
              decoding="async"
            />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.28em] text-white/70 sm:block">
              Fractured Within
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-5 -bottom-[1px] h-px bg-white transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.03] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 pb-5 pt-3 md:hidden">
            <div className="flex flex-col">
              {navItems.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`border-b border-white/[0.06] px-1 py-4 text-lg font-semibold uppercase tracking-[0.16em] transition-colors last:border-b-0 ${
                      active ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
