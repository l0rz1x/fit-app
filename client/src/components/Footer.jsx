import React from "react";
function Footer() {
  return (
    <footer className="py-6 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
      <div className="flex justify-center gap-6 mb-2">
        <a className="hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          FAQ
        </a>
      </div>
      <p className="opacity-60">© 2024 Smart Nutrition. All rights reserved.</p>
    </footer>
  );
}
export default Footer;
