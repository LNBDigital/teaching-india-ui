import React, { useEffect, useRef, useState } from "react";

export const FormSelect = ({
  className = "",
  children,
  select = "",
  required = true,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperdiv = useRef(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setSearch(""); // Clear search on open/close
  };

  const handleKeyDown = (e) => {
    if (!open && /^[a-zA-Z0-9]$/.test(e.key)) {
      setOpen(true);
      setSearch(e.key);
    }
  };

  const extractText = (node) => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join(" ");
    if (React.isValidElement(node)) return extractText(node.props.children);
    return "";
  };

  const filterChild = React.Children.toArray(children).filter((child) => {
    const labelText = extractText(child?.props?.children);
    return labelText.toLowerCase().includes(search.toLowerCase());
  });

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperdiv.current && !wrapperdiv.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full"
      onClick={handleToggle}
      ref={wrapperdiv}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Select Display / Input */}
      <div
        className={`cursor-pointer relative bg-white w-full flex items-center h-fit border border-lightBlue2 rounded-lg ${
          className 
        }`}
      >
        {!open ? (
          <span className="capitalize px-3 py-2 h-fit text-black5">
            {select || "Select"}
          </span>
        ) : (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-transparent outline-none"
            autoFocus
            required={required}
            type="text"
            placeholder={select || "Search..."}
            onClick={(e) => e.stopPropagation()} // prevent dropdown toggle
          />
        )}
        <img
          className="absolute pointer-events-none right-1 bottom-1"
          src="/icons/dropdown.svg"
          alt="dropdown icon"
        />
      </div>

      {/* Dropdown List */}
      {open && (
        <ul
          {...props}
          className="formselect absolute z-10 capitalize flex flex-col gap-1 px-3 py-2 mt-2 border border-lightBlue2 bg-white w-full max-h-60 overflow-y-auto cursor-pointer rounded-md"
        >
          {filterChild.length > 0 ? (
            filterChild
          ) : (
            <li className="text-gray-400 text-sm italic">
              No option available
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
