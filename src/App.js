import "./App.css";
import { useEffect, useState } from "react";
import musica from "./img/PedacinhoMeu.mp3";
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import SlideImages from "./components/SlideImages";
import { Howl, Howler } from "howler";

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
  const [searchParams] = useSearchParams();

  const [mutted, setMutted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const nameBase64 = searchParams.get("__name");
  const name = nameBase64 ? atob(nameBase64) : null;

  const sound = new Howl({
    src: [musica],
    loop: true,
    onplayerror: function () {
      sound.once("unlock", function () {
        sound.play();
      });
    },
    onplay: () => {
      console.log("PLAYING");
      setPlaying(true);
    },
  });

  const pausarMusica = () => {
    if (!playing) {
      sound.play();
      return;
    }

    Howler.mute(!mutted);

    setMutted(!mutted);
    console.log(mutted);
  };

  useEffect(() => {
    sound.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            descobriremos juntos o sexo do nosso bebê. Contamos muito com sua
            presença.
          </h4>

          <SlideImages className="mt-3" />

          <Button
            className="my-3 button"
            variant="outline-primary"
            onClick={pausarMusica}
          >
            {mutted || !playing ? "TOCAR MÚSICA" : "PARAR MÚSICA"}
          </Button>

          <hr></hr>

          <div>
            <p style={{ fontSize: 24 }}>
              <FontAwesomeIcon icon={faCalendarDay} />
              <span className="mx-2">Dia 06 de Agosto de 2022 - 16:00h</span>
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
              href={`https://docs.google.com/forms/d/e/1FAIpQLScN8tSN3QuQ7VlAiGuvg2j9fxYjOOq4CE1Lwf2iIRgw6uMlMw/viewform?usp=pp_url&entry.269541413=${
                name || ""
              }`}
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
