"use client";
import Image from "next/image";
import style from "./page.module.css";
import GImage from "./G.jpg";
import IncorrectSound from "./incorrect.mp3";
import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
const Swal = require("sweetalert2");
import React from "react";
import { title } from "process";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

function BTN(event) {
  const buttonText = event.currentTarget.textContent;
  console.log(buttonText);
  return buttonText;
}
function win() {
  return Swal.fire({
    title: "Congratulations!",
    text: "You graduated!",
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
  });
}
function Next_Stage() {
  return Swal.fire({
    title: "Stage Done ",
    icon: "success",
    confirmButtonText: `Next`,
    allowOutsideClick: false, // Prevent closing by clicking outside
  });
}
function lose() {
  return Swal.fire({
    title: "You Lose ",
    icon: "error",
    confirmButtonText: `repeat`,
    allowOutsideClick: false, // Prevent closing by clicking outside
  });
}
function sweetalert(b, setb) {
  if (b === 1) {
  } else {
    return Swal.fire({
      title: "Hello in Mossaab Game",
      text: "Please Entre Votre Name",
      allowOutsideClick: false,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: false,
      confirmButtonText: "Valider",

      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (!login) {
          Swal.showValidationMessage("Name is required");
          return false;
        } else {
          return Swal.fire({
            title: "hi " + login,
            icon: "success",
            confirmButtonText: `start  first stage`,
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
  var WordC;
  var tentative;
  if (!sessionStorage.getItem("tentative")) {
    sessionStorage.setItem("tentative", 3);
  }
  if (sessionStorage.getItem("WordC")) {
    WordC = sessionStorage.getItem("WordC");
  } else {
    WordC = "*".repeat(len);
  }

  for (let i = 0; i <= len; i++) {
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
  const maxtentativ = 7;
  const DangerTentative = 3;
  var found = false;
  const [b, setb] = useState(0);
  const [level, setlevel] = useState(0);
  const [tentative_effect, settentative_effect] = useState("");
  var words = ["mossaab", "informatics", "swimming"];
  var geusses = ["Someone's name", "Someone's specialty", "Someone's sport"];
  const [word, setword] = useState(words[level]);
  const [guess, setguess] = useState(geusses[level]);
  const prevWordc = useRef();
  const [wordc, setwordc] = useState("*".repeat(word.length));
  const [tentative, settentative] = useState(maxtentativ);
  const SoundIncorrect = new Howl({
    src: [IncorrectSound],
  });

  useEffect(() => {
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
      span.style.setProperty("--delay", index); // Set delay for each letter
      container.appendChild(span);
    });

    if (word === wordc) {
      if (level + 1 === words.length) {
        win();
      } else {
        setlevel(level + 1);
        Next_Stage();
      }
    }
    console.log(tentative + "------" + wordc);
  }, [wordc]);
  useEffect(() => {
    settentative_effect(style.tentative);

    if (tentative === 0) {
      lose();
      settentative(maxtentativ);
      setlevel(0);
      setwordc("*".repeat(word.length));
    }
    if (tentative != maxtentativ) {
      SoundIncorrect.play();
      const container = document.getElementById("wordc");
      container.innerHTML = "";
      wordc.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.className = style.false;

        span.textContent = letter;

        span.style.setProperty("--delay", index); // Set delay for each letter
        container.appendChild(span);
      });
    }
    if (tentative <= DangerTentative) {
      settentative_effect(style.tentativeDanger);
    } else {
      const timer = setTimeout(() => {
        settentative_effect("");
      }, 250); // Match the duration of the animation
      return () => clearTimeout(timer);
    }

    console.log(tentative + "------" + wordc);
  }, [tentative]);
  function BTN(event) {
    let newwordc = wordc.split("");
    const buttonText = event.currentTarget.textContent;

    for (let i = 0; i <= word.length; i++) {
      if ((word[i] === buttonText) & (newwordc[i] != buttonText)) {
        newwordc[i] = word[i];
        found = true;
        setwordc(newwordc.join(""));
        break;
      }
    }
    if (!found) {
      setwordc(wordc);
      console.log("i will modifed tentative" + found);
      settentative(tentative - 1);
    }
  }
  useEffect(() => {
    // Get all div elements
    const divs = document.getElementsByTagName("div");

    // Check if there are any div elements
    if (divs.length > 0) {
      // Get the first div element
      const div = divs[0];

      // Apply the blur effect using CSS
      div.style.filter = "blur(0px)"; // Adjust the blur amount as needed
    }
  }, [b]);

  useEffect(() => {
    // Get all div elements
    const divs = document.getElementsByTagName("div");

    // Check if there are any div elements
    if (divs.length > 0) {
      // Get the first div element
      const div = divs[0];

      // Apply the blur effect using CSS
      div.style.filter = "blur(10px)"; // Adjust the blur amount as needed
    }
    sweetalert(b, setb);
  }, []);

  return (
    <>
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

              <h4 className={style.h4}>{guess}</h4>
            </div>

            <h1 id="wordc" className={style.wordc}></h1>
            <h4>
              <span className={style.tentativetext}>
                TENTATIVES INCORRECTES
              </span>
              <b>
                <span className={tentative_effect}> {tentative}</span>/{" "}
                {maxtentativ}
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
    </>
  );
}
export default Game;