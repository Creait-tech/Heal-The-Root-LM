"use client";

import { forwardRef, useRef } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className = "", onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // Auto-grow
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-body text-soft-brown mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          onChange={handleChange}
          className={`w-full min-h-[120px] max-h-[300px] p-4 bg-white/60 border border-sage/20
                     rounded-lg font-body text-charcoal placeholder:text-soft-brown/40
                     focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold
                     transition-all duration-200 resize-none ${className}`}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
