function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white text-center p-4">
      © {new Date().getFullYear()} TransportConnect. All rights reserved.
    </footer>
  );
}

export default Footer;
