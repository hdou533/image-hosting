import React from "react";
import { NavLink } from "react-router-dom";

const LayoutWrapper = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full p-4">
      <header className="flex justify-between mb-8">
        <div>Logo</div>
        <nav className="flex gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </nav>
        <div className="flex gap-4">
          <p>sign up</p>
          <p>log in</p>
        </div>
      </header>
      {children}
      <footer className="w-full text-center p-4">
        Personal Image hosting website &copy;{currentYear}
      </footer>
    </div>
  );
};

export default LayoutWrapper;
