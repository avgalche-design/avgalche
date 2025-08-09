// components/AnimatedHamburger.jsx
export default function AnimatedHamburger({ isOpen, onClick }) {
  return (
    <button
      aria-label="Toggle menu"
      onClick={onClick}
      className="w-10 h-10 flex flex-col justify-center items-center relative z-60 focus:outline-none"
      tabIndex={0}
    >
      {/* Top Line */}
      <span
        className={`block absolute left-1/2 w-8 h-0.5 rounded bg-white transition-all duration-300
          ${
            isOpen
              ? "rotate-45 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "top-[12px] -translate-x-1/2"
          }`}
        style={{ transformOrigin: "center" }}
      />
      {/* Bottom Line */}
      <span
        className={`block absolute left-1/2 w-8 h-0.5 rounded bg-white transition-all duration-300
          ${
            isOpen
              ? "-rotate-45 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "top-[20px] -translate-x-1/2"
          }`}
        style={{ transformOrigin: "center" }}
      />
    </button>
  );
}
