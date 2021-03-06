import React, { useEffect, useRef, useState } from "react";

import "./SlideImages.css";

import fotoBarriga from "../../img/foto-barriga.jpeg";
import fotoTesteGrav from "../../img/imagem-teste-grav.jpeg";
import fotoDiaTransf from "../../img/imagem-transf.jpeg";
import fotoUSG6sem from "../../img/imagem-USG6sem.jpeg";
import fotoUSG12sem from "../../img/imagem-usg-12sem.jpeg";
import fotoBarriga11sem from "../../img/foto-barriga-11sem.jpeg";
import papai from "../../img/papai.jpeg";

import fotoParque01 from "../../img/foto-parque01.jpeg";
import fotoParque02 from "../../img/foto-parque02.jpeg";
import fotoParque03 from "../../img/foto-parque03.jpeg";
import fotoParque04 from "../../img/foto-parque04.jpeg";
import fotoParque05 from "../../img/foto-parque05.jpeg";
import fotoParque06 from "../../img/foto-parque06.jpeg";

const slideImages = [
  {
    url: fotoDiaTransf,
    caption: "Primeiro ultrassom",
  },
  {
    url: fotoTesteGrav,
    caption: "Teste positivo",
  },
  {
    url: papai,
    caption: "Teste positivo",
  },
  {
    url: fotoUSG6sem,
    caption: "Primeiro Ultrassom",
  },
  {
    url: fotoBarriga11sem,
    caption: "Primeiro Ultrassom",
  },
  {
    url: fotoUSG12sem,
    caption: "Primeiro Ultrassom",
  },
  {
    url: fotoBarriga,
    caption: "",
  },
  {
    url: fotoParque05,
    caption: "",
  },
  {
    url: fotoParque06,
    caption: "",
  },
  // {
  //   url: fotoParque01,
  //   caption: "",
  // },
  {
    url: fotoParque02,
    caption: "",
  },
  {
    url: fotoParque03,
    caption: "",
  },
  // {
  //   url: fotoParque04,
  //   caption: "",
  // },
];

export default function SlideImages() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
        ),
      2500
    );

    return () => resetTimeout();
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slideImages.map((slideImage, idx) => (
          <div className="slide" key={idx}>
            <img
              className="slide-img"
              src={slideImage.url}
              alt={slideImage.caption}
            ></img>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {slideImages.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
