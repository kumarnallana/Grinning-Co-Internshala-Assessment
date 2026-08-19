// V5 Motion System Tokens

// Signature easing curve (overshoot-and-settle)
export const SIGNATURE_EASE = [0.22, 1, 0.36, 1] as const;

// Standard duration for section transitions
export const SIGNATURE_DURATION = 0.8;

export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;
