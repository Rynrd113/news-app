"use client";

import React, { useState } from "react";
import "./header.css";
import Nav from "./Nav";
import Sci from "./Sci";
import SearchForm from "./SearchForm";

export default function Header() {
  // State untuk mengatur form pencarian dan menu navigasi
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Fungsi untuk membuka/tutup form pencarian
  const toggleSearchForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchOpen(!isSearchOpen);
  };

  // Fungsi untuk membuka/tutup menu navigasi
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        {/* Logo dan judul */}
        <a href="/" className="logo d-flex align-items-center">
          <img src="assets/img/kpu.png" alt="Logo KPU" />
          <h1>KPU Nduga</h1>
        </a>
        {/* Komponen navigasi */}
        <Nav />
        <div className="position-relative">
          {/* Komponen Sci */}
          <Sci />
          {/* Tombol untuk membuka form pencarian */}
          <a className="mx-2 js-search-open" onClick={toggleSearchForm}>
            <span className="bi-search"></span>
          </a>
          {/* Tombol untuk membuka/tutup menu navigasi */}
          <i
            className={`bi ${
              isMenuOpen ? "bi-x" : "bi-list"
            } mobile-nav-toggle`}
            onClick={toggleMenu}
          ></i>
          {/* Komponen form pencarian */}
          <SearchForm active={isSearchOpen} formOpen={toggleSearchForm} />
        </div>
      </div>
    </header>
  );
}
