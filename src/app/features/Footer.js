import React from "react";

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white mt-16 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="bg-white text-indigo-600 w-6 h-6 rounded flex items-center justify-center font-black text-xs italic">
              Z
            </span>
            Movie Z
          </div>
          <p className="text-indigo-200 text-xs">
            © 2026 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact Information</h4>
          <p className="text-indigo-200 text-xs mb-1">
            Email: support@moviez.com
          </p>
          <p className="text-indigo-200 text-xs">Phone: +976 11 123456</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-2">Follow us</h4>
          <div className="flex gap-4 text-indigo-200 text-xs">
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
