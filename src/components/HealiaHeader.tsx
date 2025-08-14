import { Button } from "@/components/ui/button";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "@/assets/img.jpg";
import { loginWithGoogle, logoutUser, auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HealiaHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  },);

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={img} alt="Healia" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-medical bg-clip-text text-transparent">
              
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-foreground/80 hover:text-primary transition-colors">
              Features
            </a>
            <Link to="/find-doctors" className="text-foreground/80 hover:text-primary transition-colors">
              Find Doctors
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm">Hi, {user.displayName}</span>
                <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <Button variant="ghost" onClick={handleSignIn}>Sign In</Button>
            )}
            <Button variant="hero">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white/95 backdrop-blur-lg">
            <nav className="flex flex-col gap-4 p-4">
              <a
                href="/#features"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <Link
                to="/find-doctors"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Doctors
              </Link>
              <Link
                to="/about"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                {user ? (
                  <Button variant="ghost" className="justify-start" onClick={handleSignOut}>Sign Out</Button>
                ) : (
                  <Button variant="ghost" className="justify-start" onClick={handleSignIn}>Sign In</Button>
                )}
                <Button variant="hero" className="justify-start">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HealiaHeader;
