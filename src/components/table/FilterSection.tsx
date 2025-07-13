import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

export type FilterConfig =
  | {
      id: string;
      type: "search";
      placeholder?: string;
    }
  | {
      id: string;
      type: "dropdown";
      placeholder?: string;
      options: FilterOption[];
    };

interface FilterSectionProps {
  filterConfigs: FilterConfig[];
}

export default function FilterSection({ filterConfigs }: FilterSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSelectedValues = useMemo(() => {
    const initial: Record<string, string | null> = {};
    filterConfigs.forEach((filter) => {
      const value = searchParams.get(filter.id);
      initial[filter.id] = value || null;
    });
    return initial;
  }, [filterConfigs, searchParams]);

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>(
    () => {
      const inputs: Record<string, string> = {};
      filterConfigs.forEach((filter) => {
        if (filter.type === "search") {
          inputs[filter.id] = searchParams.get(filter.id) || "";
        }
      });
      return inputs;
    }
  );

  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleChange = (id: string, value: string | null) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(id, value);
    } else {
      newParams.delete(id);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSearchChange = (id: string, value: string) => {
    setSearchInputs((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleChange(id, value);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {filterConfigs.map((filter) => {
        if (filter.type === "dropdown" && "options" in filter) {
          return (
            <div key={filter.id} className="flex items-center gap-1">
              {selectedValues[filter.id] && (
                <button
                  onClick={() => handleChange(filter.id, null)}
                  className="text-sm border border-gray-300 hover:bg-gray-100 rounded-full p-1"
                >
                  <X className="w-3 h-3 text-gray-600" />
                </button>
              )}
              <select
                value={selectedValues[filter.id] || ""}
                onChange={(e) =>
                  handleChange(filter.id, e.target.value || null)
                }
                className="w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-400"
              >
                <option value="">{filter.placeholder || "Pilih"}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (filter.type === "search") {
          return (
            <div key={filter.id} className="relative w-52">
              <input
                type="text"
                value={searchInputs[filter.id] || ""}
                onChange={(e) => handleSearchChange(filter.id, e.target.value)}
                placeholder={filter.placeholder || "Cari..."}
                className={`
                  w-full text-base pl-8 pr-3 py-2 rounded-md 
                  ${"outline-neutral-200 focus:outline-blue-400"}
                   outline-1
                `}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
