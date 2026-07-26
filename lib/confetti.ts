import confetti from "canvas-confetti";

const HEAT_COLORS = ["#FF6B35", "#FFB627", "#7DD3FC"];

export function fireCompletionConfetti() {
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.7 },
    colors: HEAT_COLORS,
    scalar: 0.9,
    ticks: 180,
  });
}

export function fireMilestoneConfetti() {
  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.6 },
    colors: HEAT_COLORS,
    scalar: 1.1,
    ticks: 220,
  });
}

export function fireLevelUpConfetti() {
  const end = Date.now() + 600;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: HEAT_COLORS });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: HEAT_COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
