import "./App.css";
import { useEffect, useRef, useState } from "react";
import musica from "./img/PedacinhoMeu.mp3";
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
  faCalendarCheck,
  faFileInvoice,
  faHeart,
  faStairs,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SlideImages from "./components/SlideImages";
import GiftBanner from "./components/GiftBanner";

const nomeMenina = "Girl";
const nomeMenino = "Boy";

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

function base64_decode(s) {
  return decodeURIComponent(escape(atob(s)));
}

function Home() {
  const [searchParams] = useSearchParams();
  const musicaRef = useRef();
  const [started, setStarted] = useState(false);

  const nameBase64 = searchParams.get("__name");
  const query = nameBase64 ? base64_decode(nameBase64) : null;
  const queryItems = query ? query.split(";") : [];
  const name = queryItems.length > 0 ? queryItems[0] : null;

  const giftList = queryItems
    .filter((_, index) => index > 0)
    .map((x) => {
      return x.replace("1 pct fraldas", "1 pacote de fraldas");
    });

  const userEvents = ["click", "mousedown", "keydown", "touchstart"];

  const tryToStartMusic = () => {
    if (musicaRef.current) {
      musicaRef.current.volume = 0.3;
      musicaRef.current.play();
      userEvents.forEach((e) => window.removeEventListener(e, tryToStartMusic));
    }
  };

  const verConvite = () => {
    setStarted(true);
    tryToStartMusic();
  };

  useEffect(() => {
    // sound.play();
    userEvents.forEach((e) => window.addEventListener(e, tryToStartMusic));
    if (musicaRef.current) {
      musicaRef.current.play();
    }

    return () => {
      userEvents.forEach((e) => window.removeEventListener(e, tryToStartMusic));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {!started && (
        <div
          className={`Modal ${started ? "close" : "open"}`}
          style={{
            textAlign: "center",
            paddingTop: 30,
          }}
        >
          <Button
            size="lg"
            className="my-2"
            variant="primary"
            onClick={verConvite}
          >
            <FontAwesomeIcon icon={faStar} />
            <span className="mx-3">CLIQUE PARA VER O CONVITE</span>
            <FontAwesomeIcon icon={faStar} />
          </Button>
        </div>
      )}

      {started && (
        <div
          className={`Modal ${started ? "open" : "close"}`}
          style={{ textAlign: "center", paddingBottom: 30 }}
        >
          <header className="App-header">
            <h2>CONVITE</h2>
            <h1 style={{ fontSize: 48 }}>Ch?? revela????o</h1>
            <h1>
              <span className="menino">{nomeMenino}</span> ou{" "}
              <span className="menina">{nomeMenina}</span>?
            </h1>
            <hr></hr>
            {name && <h3 style={{ fontSize: 30 }}>Ol??, {name}</h3>}
            <h4 className="mx-3">
              Mery e Eduardo te convidam para esse momento t??o especial, onde
              descobriremos juntos o sexo do nosso beb??. Contamos muito com sua
              presen??a.
            </h4>

            <SlideImages className="mt-3" />

            <audio
              src={musica}
              ref={musicaRef}
              volume={0.1}
              controls
              autoPlay
              loop
            />

            <hr></hr>

            <div>
              <p style={{ fontSize: 24 }}>
                <FontAwesomeIcon icon={faCalendarDay} />
                <span className="mx-2">Dia 06 de Agosto de 2022 - 16:00h</span>
              </p>
              <div>
                <Button
                  size="lg"
                  className="my-2 button"
                  variant="outline-primary"
                  href={`https://docs.google.com/forms/d/e/1FAIpQLScN8tSN3QuQ7VlAiGuvg2j9fxYjOOq4CE1Lwf2iIRgw6uMlMw/viewform?usp=pp_url&entry.269541413=${
                    name || ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="me-3" />
                  Clique para confirmar sua presen??a
                </Button>
              </div>

              {giftList.length > 0 && (
                <GiftBanner giftList={giftList} className="mt-1" />
              )}

              <h4 className="mx-3 mt-2">
                Se voc?? acha que ser?? um menino venha de azul, se voc?? acha que
                ser?? uma menina venha de rosa.
              </h4>

              <p style={{ fontSize: 18 }} className="mt-2">
                <FontAwesomeIcon icon={faMapLocation} />
                <a
                  className="mx-2"
                  href="https://goo.gl/maps/zMwQfCpCxgSEYWgC6"
                >
                  Rua Tapuias, 120 - Socorro - S??o Paulo
                </a>
              </p>
            </div>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
