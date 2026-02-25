import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

function SearchBar({ value, onSearch, placeholder = "جستجو..." }) {
  return (
    <div className="relative w-[80%] mr-4 ">
      <div className="relative flex items-center">
        <FiSearch className="absolute text-gray-400 right-3" size={20} />

        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-10 text-right border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-dark/50"
        />

        {value && (
          <button
            onClick={() => onSearch("")}
            className="absolute text-gray-400 transition left-3 hover:text-gray-600"
          >
            <MdClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
