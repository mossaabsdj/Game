"use client";
import Image from "next/image";
import style from "./page.module.css";
import GImage from "./G.jpg";
import IncorrectSound from "./incorrect.mp3";
import ImageSplitter from "./test/page.jsx"; // Ensure this is a valid component
import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
const Swal = require("sweetalert2");

const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const SoundNext = new Howl({ src: ["/next.mp3"] });

function BTN(event) {
  const buttonText = event.currentTarget.textContent;
  console.log(buttonText);
  return buttonText;
}

function win() {
  return Swal.fire({
    title: "Congratulations!",
    text: "You are a super fan!",
    width: 600,
    padding: "3em",
    color: "#fff",
    background: "#4caf50 url(/images/graduation.png)",
    backdrop: `
      rgba(76, 175, 80, 0.4)
      url("/images/celebrate.gif")
      center top
      no-repeat
    `,
    confirmButtonText: "Hooray!",
    confirmButtonColor: "#ff9800",
    icon: "success",
    imageUrl: "duncky.jpg",
  });
}

function Next_Stage(img, level) {
  return Swal.fire({
    title: "Stage Done",
    icon: "success",
    imageUrl: img[level],
    confirmButtonText: "Next",
    allowOutsideClick: false, // Prevent closing by clicking outside
    preConfirm: (c) => {
      if (c) {
        SoundNext.play();
      }
    },
  });
}

function lose() {
  return Swal.fire({
    title: "You Lose",
    icon: "error",
    confirmButtonText: "Repeat",
    allowOutsideClick: false, // Prevent closing by clicking outside
  });
}

async function ArchiveName() {
  const newItem = { name: "itemName", value: "itemValue" };

  const response = await fetch("/api/UpdateArchive", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (response.ok) {
    console.log("Item added successfully");
  } else {
    console.error("Failed to add item");
  }
}

function sweetalert(b, setb) {
  if (b === 1) {
    return;
  } else {
    return Swal.fire({
      title: "Hello in Mossaab Game",
      text: "Please Enter Your Name",
      allowOutsideClick: false,
      input: "text",
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: false,
      confirmButtonText: "Validate",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (!login) {
          Swal.showValidationMessage("Name is required");
          return false;
        } else {
          return Swal.fire({
            title: "Hi " + login,
            icon: "success",
            confirmButtonText: "Start First Stage",
            allowOutsideClick: false, // Prevent closing by clicking outside
          }).then((result) => {
            if (result.isConfirmed) {
              setb(1);
            }
          });
        }
      },
    });
  }
}

function Stage(Word, l) {
  var len = Word.length;
  var WordC = sessionStorage.getItem("WordC") || "*".repeat(len);
  var tentative = sessionStorage.getItem("tentative") || 3;

  for (let i = 0; i < len; i++) {
    if (l === Word[i]) {
      WordC[i] = Word[i];
      break;
    } else {
      sessionStorage.setItem("tentative", tentative - 1);
    }
  }
  sessionStorage.setItem("WordC", WordC);
  console.log("word" + WordC);
  console.log("tentative" + sessionStorage.getItem("tentative"));
  if (WordC === Word) {
    console.log("you win");
  }
  if (sessionStorage.getItem("tentative") === 0) {
    console.log("you lose");
  }
}

function Game() {
  const [find, setfind] = useState(false);
  const [array, setarray] = useState([0, 1, 2, 3]);
  const [random, setrandom] = useState(0);
  const [b, setb] = useState(0);
  const [level, setlevel] = useState(0);
  const [tentative_effect, settentative_effect] = useState("");

  const words = ["librarys", "swimming", "onepiece", "mossaabsdj"];
  const geusses = [
    "Someone's Job Places",
    "Someone's Sport",
    "Someone's Best Anime",
    "Best Person in the World",
  ];
  const img = ["download.jpg", "swimming.jpg", "onepiece.jpg", "mossaab.jpg"];
  const row = [4, 4, 4, 5];
  const col = [2, 2, 2, 2];
  const Scale = [0.9, 0.9, 0.7, 0.2];
  const [word, setword] = useState(words[level]);
  const [guess, setguess] = useState(geusses[level]);
  const prevWordc = useRef();
  const [wordc, setwordc] = useState("*".repeat(word.length));
  const [tentative, settentative] = useState(7);
  const SoundIncorrect = new Howl({ src: [IncorrectSound] });
  const Soundcorrect = new Howl({ src: ["/win.mp3"] });

  useEffect(() => {
    if (find) {
      let randomIndex = Math.floor(Math.random() * array.length);
      let randomNumber = array[randomIndex];
      array.splice(randomIndex, 1);
      setarray([...array]); // Create a new array reference
      setrandom(randomNumber);
    }
  }, [find]);

  useEffect(() => {
    setarray(Array.from(Array(words[level].length).keys()));
    setword(words[level]);
    setwordc("*".repeat(words[level].length));
    setguess(geusses[level]);
  }, [level]);

  useEffect(() => {
    const container = document.getElementById("wordc");
    container.innerHTML = "";

    wordc.split("").forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.className = style.true;
      span.style.setProperty("--delay", index);
      container.appendChild(span);
    });

    if (word === wordc) {
      if (level + 1 === words.length) {
        win();
      } else {
        setlevel(level + 1);
        Next_Stage(img, level);
      }
    }
  }, [wordc]);

  useEffect(() => {
    settentative_effect(style.tentative);

    if (tentative === 0) {
      lose();
      settentative(7);
      setlevel(0);
      setwordc("*".repeat(word.length));
    }

    if (tentative < 7) {
      SoundIncorrect.play();
      const container = document.getElementById("wordc");
      container.innerHTML = "";
      wordc.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.className = style.false;
        span.textContent = letter;
        span.style.setProperty("--delay", index);
        container.appendChild(span);
      });
    }

    if (tentative <= 3) {
      settentative_effect(style.tentativeDanger);
    } else {
      const timer = setTimeout(() => {
        settentative_effect("");
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [tentative]);

  function BTN(event) {
    let newwordc = wordc.split("");
    const buttonText = event.currentTarget.textContent;
    let found = false;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === buttonText && newwordc[i] !== buttonText) {
        newwordc[i] = word[i];
        found = true;
        setfind(true);
        setwordc(newwordc.join(""));
        Soundcorrect.play();
        setTimeout(() => setfind(false), 5);
        break;
      }
    }

    if (!found) {
      settentative(tentative - 1);
    }
  }

  useEffect(() => {
    sweetalert(b, setb);
  }, []);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.jeupendu}>
          <Image src={GImage} />
          <h1>JEU DU PENDU</h1>
        </div>
        <div className={style.gamebox}>
          <div className={style.worddisplay} id="word-display">
            <div id="s"></div>
          </div>

          <div className={style.Guess}>
            <h3 className={style.h3}>Guess:</h3>
            <ImageSplitter />
            <h4 className={style.h4}>{guess}</h4>
          </div>

          <h1 id="wordc" className={style.wordc}></h1>
          <h4>
            <span className={style.tentativetext}>TENTATIVES INCORRECTES</span>
            <b>
              <span className={tentative_effect}> {tentative}</span>/ {7}
            </b>
          </h4>
          <div className={style.keyboard}>
            {letters.map((l) => (
              <button onClick={BTN} key={l} className={style.btn}>
                {l}
              </button>
            ))}

            <button className={style.btn}>GO</button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
