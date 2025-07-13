interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MainButton({
  children,
  className,
  onClick,
  disabled,
  ...props
}: MainButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        disabled
          ? " bg-blue-200 hover:bg-blue-200 cursor-not-allowed "
          : " bg-blue-400 hover:bg-blue-500 cursor-pointer "
      } text-neutral-50 font-normal px-8 py-2 rounded-md transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
