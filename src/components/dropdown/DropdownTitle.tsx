import type { FC, ReactNode } from "react";
import { useDropdownContext } from "./Dropdown";
import { ChevronDown } from "lucide-react";

interface DropdownTitleProps {
  children: ReactNode;
  className?: string;
}

const DropdownTitle: FC<DropdownTitleProps> = ({
  children,
  className = "",
}) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={
        "flex items-center justify-end gap-1 w-fit  hover:cursor-pointer " +
        className
      }
    >
      {children}
      <span
        className={`transform transition-transform duration-200 ${
          isOpen ? "rotate-[-180deg]" : "rotate-0"
        }`}
      >
        <ChevronDown size={20} />
      </span>
    </div>
  );
};

export default DropdownTitle;
