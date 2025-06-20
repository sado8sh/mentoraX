
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">
              Mentora<span className="text-secondary">X</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#why-us" className="text-sm font-medium hover:text-primary transition-colors">
              Pourquoi MentoraX
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Nos offres
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              Comment ça marche
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="default" asChild>
              <a href="/dashboard">Tableau de bord</a>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b shadow-lg">
            <a
              href="#why-us"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Pourquoi MentoraX
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Nos offres
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Comment ça marche
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <div className="px-3 py-2">
              <Button variant="default" className="w-full" asChild>
                <a href="/dashboard">Tableau de bord</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
