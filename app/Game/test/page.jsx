"use client";

import { useEffect, useRef, useState } from "react";

const ImageSplitter = ({ random, imgg, scalee, rowss, colss }) => {
  const imageRef = useRef(null);
  const [img, setimg] = useState("null");
  const [scale, setscale] = useState(1);
  const [row, setrow] = useState(6);
  const [col, setcol] = useState(2);

  useEffect(() => {
    setcol(colss);
  }, [colss]);

  useEffect(() => {
    setscale(scalee);
  }, [scalee]);

  useEffect(() => {
    setrow(rowss);
  }, [rowss]);

  useEffect(() => {
    setimg(imgg);
  }, [imgg]);

  const unlock = (i) => {
    const canvas = document.getElementById("canvas-" + i);
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const image = new Image();
      image.src = img;

      image.onload = () => {
        const rows = row;
        const cols = col;
        const scaleFactor = scale;
        const scaledWidth = (image.width * scaleFactor) / cols;
        const scaledHeight = (image.height * scaleFactor) / rows;

        ctx.filter = "blur(0px";
        const x = i % cols;
        const y = Math.floor(i / cols);

        ctx.drawImage(
          image,
          x * (image.width / cols),
          y * (image.height / rows),
          image.width / cols,
          image.height / rows,
          0,
          0,
          scaledWidth,
          scaledHeight
        );
      };
    }
  };

  useEffect(() => {
    if (random !== null) {
      unlock(random);
    }
  }, [random]);

  useEffect(() => {
    const image = new Image();
    image.src = img;

    image.onload = () => {
      const rows = row;
      const cols = col;
      const scaleFactor = scale;
      const scaledWidth = (image.width * scaleFactor) / cols;
      const scaledHeight = (image.height * scaleFactor) / rows;

      imageRef.current.innerHTML = "";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const canvas = document.createElement("canvas");
          canvas.id = `canvas-${y * cols + x}`;
          canvas.width = scaledWidth;
          canvas.height = scaledHeight;
          const ctx = canvas.getContext("2d");

          ctx.filter = "blur(20px)";
          ctx.drawImage(
            image,
            x * (image.width / cols),
            y * (image.height / rows),
            image.width / cols,
            image.height / rows,
            0,
            0,
            scaledWidth,
            scaledHeight
          );

          imageRef.current.appendChild(canvas);
        }
      }
    };

    return () => {
      if (imageRef.current) {
        imageRef.current.innerHTML = "";
      }
    };
  }, [img]);

  return (
    <div
      style={{
        position: "relative",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <div
        ref={imageRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      ></div>
    </div>
  );
};

export default ImageSplitter;
