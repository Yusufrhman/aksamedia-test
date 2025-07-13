import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import DropdownTitle from "./DropdownTitle";

interface DropdownContextType {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
}

const AccordionContext = createContext<DropdownContextType | undefined>(
  undefined
);

export function useDropdownContext(): DropdownContextType {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(
      "Komponen yang berkaitan dengan dropdown harus dipakai di dalam <Dropdown>"
    );
  }
  return ctx;
}

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

const Dropdown: FC<DropdownProps> & {
  Item?: any;
  Menu?: any;
  Title?: any;
} = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openDropdown() {
    setIsOpen(true);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const contextValue: DropdownContextType = {
    isOpen,
    openDropdown,
    closeDropdown,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={"relative " + (className ?? "")}
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Tambahkan properti statis (nanti ganti `any` jika tahu tipenya)
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Title = DropdownTitle;

export default Dropdown;
