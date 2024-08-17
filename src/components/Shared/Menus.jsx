import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const MenuItem = ({ item, onHover, hoveredPath, onClick, clickedPath }) => {
  const isHovered = hoveredPath.includes(item.slug);
  const isClicked = clickedPath.includes(item.slug);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (!hoveredPath.includes(item.slug)) {
          onHover([...hoveredPath, item.slug]);
        }
      }}
      onMouseLeave={() => {
        onHover(hoveredPath.filter((slug) => slug !== item.slug));
      }}
    >
      <Link href={`/category/${item.slug}`}>
        <div
          className={`w-72 h-12 border-b border-gray-300 flex items-center justify-between pl-6 drop-shadow-lg ${
            isClicked
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          <span>{item.name}</span>
          {item.subcategories && item.subcategories.length > 0 && (
            <span
              className="h-full flex items-center justify-center w-10"
              onMouseEnter={(e) => {
                e.preventDefault();
                onClick([...clickedPath, item.slug]);
              }}
            >
              <FaChevronRight />
            </span>
          )}
        </div>
      </Link>
      {isClicked && item.subcategories && item.subcategories.length > 0 && (
        <div className="absolute top-0 left-full z-10">
          {item.subcategories.map((subItem, index) => (
            <MenuItem
              key={index}
              item={subItem}
              onHover={onHover}
              hoveredPath={hoveredPath}
              onClick={onClick}
              clickedPath={clickedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Menus = ({ allMenus, setIsCategoryOpen }) => {
  const [hoveredPath, setHoveredPath] = useState([]);
  const [clickedPath, setClickedPath] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsCategoryOpen(true);
    const handleMouseLeave = () => {
      setHoveredPath([]);
      setClickedPath([]);
      setIsCategoryOpen(false);
    };

    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener("mouseenter", handleMouseEnter);
      menuElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener("mouseenter", handleMouseEnter);
        menuElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [setIsCategoryOpen]);

  return (
    <div ref={menuRef} className="relative">
      {allMenus.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          onHover={setHoveredPath}
          hoveredPath={hoveredPath}
          onClick={setClickedPath}
          clickedPath={clickedPath}
        />
      ))}
    </div>
  );
};

export default Menus;
