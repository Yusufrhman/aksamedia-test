import { Eye, EyeOff } from "lucide-react";
import {
  useState,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  className = "",
  labelClassName = "",
  error,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputClass = `
    w-full text-base px-4 py-2 pr-10 rounded-md 
    ${
      error
        ? "outline-red-500 focus:outline-red-500"
        : "outline-neutral-200 focus:outline-blue-400"
    }
    outline-1
    ${className}
  `;

  return (
    <div>
      {label && (
        <label htmlFor={id} className={`text-sm font-light ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="w-full relative mt-2">
        <input
          id={id}
          name={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={inputClass}
          placeholder={placeholder}
          autoComplete={isPassword ? "current-password" : ""}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-300 cursor-pointer"
          >
            {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
