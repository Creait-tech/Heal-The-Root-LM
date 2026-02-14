"use client";

import { useState } from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

export default function Slider({
  value,
  onChange,
  min = 1,
  max = 10,
  minLabel = "Never",
  maxLabel = "Always",
  className = "",
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative pt-2 pb-6">
        {/* Track - taller on mobile for easier touch */}
        <div className="relative h-3 sm:h-3 bg-sage/10 dark:bg-dark-surface rounded-full">
          {/* Filled track */}
          <div
            className="absolute h-full bg-sage/30 rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
          {/* Native range input for accessibility - enlarged touch area */}
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute -top-4 w-full h-[44px] opacity-0 cursor-pointer z-10"
            aria-label="Rating"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
          {/* Custom thumb - larger on mobile */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-muted-gold border-4 border-cream dark:border-dark-bg shadow-md transition-transform duration-150 pointer-events-none ${
              isDragging ? "scale-125 shadow-lg" : ""
            }`}
            style={{ left: `${percentage}%` }}
          />
        </div>

        {/* Value display */}
        <div
          className={`absolute -top-8 -translate-x-1/2 bg-charcoal dark:bg-dark-surface text-cream dark:text-dark-text text-sm font-body font-medium px-3 py-1 rounded-md transition-all duration-200 ${
            isDragging ? "opacity-100 scale-110" : "opacity-80 scale-100"
          }`}
          style={{ left: `${percentage}%` }}
        >
          {value}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs sm:text-sm text-soft-brown dark:text-dark-muted font-body">{minLabel}</span>
        {/* Scale markers - hide on very small screens */}
        <div className="flex-1 flex justify-between px-1 sm:px-2">
          {Array.from({ length: max - min + 1 }, (_, i) => (
            <span
              key={i}
              className={`text-[10px] sm:text-xs font-body transition-colors duration-150 ${
                i + min === value ? "text-muted-gold font-semibold" : "text-soft-brown/40 dark:text-dark-muted/40"
              }`}
            >
              {i + min}
            </span>
          ))}
        </div>
        <span className="text-xs sm:text-sm text-soft-brown dark:text-dark-muted font-body">{maxLabel}</span>
      </div>
    </div>
  );
}
