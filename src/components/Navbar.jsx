import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">logo</Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className={`flex-col md:flex md:flex-row md:space-x-6 ${isOpen ? "flex" : "hidden"}`}>
          {/* <Link to="/plans" className="hover:text-gray-200">Planes</Link> */}
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link to="/register" className="hover:text-gray-200">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
