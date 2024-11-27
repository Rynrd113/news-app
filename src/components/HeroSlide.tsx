import React from "react";

interface SlideProps {
  slide: {
    bgImg: string;
    title: string;
    brief: string;
  };
}

// Komponen HeroSlide untuk menampilkan slide dengan gambar latar belakang
export default function HeroSlide({ slide }: SlideProps) {
  return (
    <a
      href="#"
      className="img-bg d-flex align-items-end"
      style={{ backgroundImage: `url(/${slide.bgImg})` }}
    >
      <div className="img-bg-inner">
        <h2>{slide.title}</h2>
        <p>{slide.brief}</p>
      </div>
    </a>
  );
}
