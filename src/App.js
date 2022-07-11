import "./App.css";
import { useEffect, useState, useRef } from "react";
import fotoBarriga from "./img/foto-barriga.jpeg";
import fotoTesteGrav from "./img/imagem-teste-grav.jpeg";
import fotoDiaTransf from "./img/imagem-tranf.jpeg";
import fotoUSG6sem from "./img/imagem-USG6sem.jpeg";
import fotoUSG12sem from "./img/imagem-usg-12sem.jpeg";
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

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
    url: fotoUSG6sem,
    caption: "Primeiro Ultrassom",
  },
  {
    url: fotoUSG12sem,
    caption: "Primeiro Ultrassom",
  },
  {
    url: fotoBarriga,
    caption: "Transferência de embrião",
  },
];

const nomeMenina = "Girl";
const nomeMenino = "Boy";

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

function Home() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [searchParams, _] = useSearchParams();

  const name = searchParams.get("__name");

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
    <div>
      <div className="container" style={{ textAlign: "center" }}>
        <header className="App-header">
          <h2>CONVITE</h2>
          <h1 style={{ fontSize: 48 }}>Chá revelação</h1>
          <h1>
            <span className="menino">{nomeMenino}</span> ou{" "}
            <span className="menina">{nomeMenina}</span>?
          </h1>
          <hr></hr>
          {name && <h3 style={{ fontSize: 30 }}>Olá, {name}</h3>}
          <h4>
            Mery e Eduardo te convidam para esse momento tão especial, onde
            descobriremos juntos o sexo de nosso bebê. Contamos muito com sua
            presença para participar desse momento mágico.
          </h4>
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {slideImages.map((slideImage, idx) => (
                <div className="slide" key={idx}>
                  <img className="slide-img" src={slideImage.url}></img>
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
          <hr></hr>
          <div>
            <p style={{ fontSize: 24 }}>
              <FontAwesomeIcon icon={faCalendarDay} />
              <span className="mx-2">Dia 06 de Agosto de 2022</span>
            </p>
            <p style={{ fontSize: 18 }}>
              <FontAwesomeIcon icon={faMapLocation} />
              <a className="mx-2" href="https://goo.gl/maps/zMwQfCpCxgSEYWgC6">
                Rua Tapuias, 120 - Socorro - São Paulo
              </a>
            </p>
          </div>
          <div>
            <Button
              className="my-3 button"
              variant="outline-primary"
              href={`https://docs.google.com/forms/d/e/1FAIpQLScN8tSN3QuQ7VlAiGuvg2j9fxYjOOq4CE1Lwf2iIRgw6uMlMw/viewform?usp=pp_url&entry.269541413=${name}`}
            >
              Confirme sua presença
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
