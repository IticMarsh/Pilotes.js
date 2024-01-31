// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
// main.js

import { Pilota } from "./pilota.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const pilotes = [];

function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  if (pilotes.length === 0) {
    for (let i = 0; i < 20; i++) {
      const pilota = new Pilota(
        Math.random() * (width - 20) + 10,
        Math.random() * (height - 20) + 10,
        Math.random() * 4,
        Math.random() * 4,
        `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
        Math.random() * (20 - 10) + 10,
        width,
        height
      );
      pilotes.push(pilota);
    }
  }

  pilotes.forEach((pilota) => {
    pilota.dibuixa(ctx);
    pilota.mou();
  });

  detectaColisions(pilotes);

  requestAnimationFrame(loop);
}

function detectaColisions(pilotes) {
  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      const dx = pilotes[i].x - pilotes[j].x;
      const dy = pilotes[i].y - pilotes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < pilotes[i].mida + pilotes[j].mida) {
        // Col·lisió detectada, inverteix les velocitats
        const tempVelX = pilotes[i].velX;
        const tempVelY = pilotes[i].velY;

        pilotes[i].velX = pilotes[j].velX;
        pilotes[i].velY = pilotes[j].velY;

        pilotes[j].velX = tempVelX;
        pilotes[j].velY = tempVelY;
      }
    }
  }
}

loop();
