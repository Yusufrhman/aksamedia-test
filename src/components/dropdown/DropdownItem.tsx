import type { ButtonHTMLAttributes, FC } from "react";

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const DropdownItem: FC<DropdownItemProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={
        " py-2 px-4 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 dark:hover:text-blue-200 transition-colors hover:cursor-pointer " +
        className
      }
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default DropdownItem;
