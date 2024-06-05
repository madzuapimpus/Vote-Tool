import classnames from "tailwindcss-classnames";

export const Button = ({ text, onClick, color, textColor, isFilled }) => {
  const filledClasses = classnames(
    "border-white",
    "text-white",
    "hover:bg-white",
    "hover:text-black",
    {
      "bg-white": isFilled,
    }
  );

  return (
    <button
      onClick={onClick}
      className={`${filledClasses}  px-5 border-2 rounded-lg p-2  `}
    >
      {text}
    </button>
  );
};
