import { useState } from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  register: any;
  errors: any;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  errors,
  placeholder,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          className="input pr-10"
          placeholder={placeholder}
          {...register(id)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              {showPassword ? (
                <path
                  d="M12 3C8.13 3 5 5.9 5 9C5 12.1 8.13 15 12 15C15.87 15 19 12.1 19 9C19 5.9 15.87 3 12 3ZM12 13C9.24 13 7 10.76 7 9C7 7.24 9.24 5 12 5C14.76 5 17 7.24 17 9C17 10.76 14.76 13 12 13ZM12 3V5V3ZM12 3L12 5L12 3Z"
                />
              ) : (
                <path
                  d="M12 3C8.13 3 5 5.9 5 9C5 12.1 8.13 15 12 15C15.87 15 19 12.1 19 9C19 5.9 15.87 3 12 3ZM12 13C9.24 13 7 10.76 7 9C7 7.24 9.24 5 12 5C14.76 5 17 7.24 17 9C17 10.76 14.76 13 12 13ZM12 3L12 5L12 3Z"
                />
              )}
            </svg>
          </button>
        )}
      </div>

      {errors[id] && (
        <p className="text-red-500 text-sm">{String(errors[id]?.message)}</p>
      )}
    </div>
  );
};

export default Input;
