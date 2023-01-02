import { Fireworks } from 'fireworks-js';

export function setupfireworks(container: HTMLCanvasElement | null) {
  if (container == null) return null;
  const fireworks = new Fireworks(container, {
    rocketsPoint: {
      min: 50,
      max: 50,
    },
    hue: {
      min: 0,
      max: 360,
    },
    delay: {
      min: 0.015,
      max: 0.03,
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 3,
      },
      trace: {
        min: 1,
        max: 2,
      },
    },
    lineStyle: 'round',
    acceleration: 1.05,
    friction: 0.95,
    gravity: 1.5,
    particles: 50,
    traceLength: 3,
    flickering: 50,
    opacity: 0.5,
    explosion: 5,
    intensity: 30,
    traceSpeed: 10,
    autoresize: false,
    brightness: {
      min: 50,
      max: 80,
    },
    decay: {
      min: 0.015,
      max: 0.03,
    },
    mouse: {
      click: false,
      move: false,
      max: 1,
    },
    boundaries: {
      x: 50,
      y: 50,
      width: 0,
      height: 0,
    },
    sound: {
      enabled: false,
      files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'],
      volume: { min: 4, max: 8 },
    },
  });
  return fireworks;
}
