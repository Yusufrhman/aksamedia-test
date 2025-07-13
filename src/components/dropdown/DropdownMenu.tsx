import type { FC, ReactNode } from "react";
import { useDropdownContext } from "./Dropdown";


interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ children, className = "" }) => {
  const { isOpen } = useDropdownContext();

  return (
    <div
      className={`${className} ${isOpen ? "absolute" : "hidden"} overflow-clip`}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
