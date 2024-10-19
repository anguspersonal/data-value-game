import React from 'react';
import './Footer.css'; // Ensure the correct path to the CSS file

const Footer = () => {
  const currentYear = new Date().getFullYear();
  console.log("currentYear: " + currentYear); // Log to check if the component is rendering

  return (
    <footer className="footer">
      <p>© {currentYear} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;