import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchComponent = () => {
  return (
    <div className=" flex justify-center lg:justify-center lg:2/5 mx-2 mt-5">
      <div className="relative w-full ">
        <label
          htmlFor="searchIcon"
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <Search className="h-6 w-6 text-white" />
        </label>
        <Input
          type="text"
          placeholder="Search"
          className="block w-full bg-gray-700/50 rounded-md py-2 pl-10 pr-3 text-white placeholder-white focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-900 lg:w-full h-8"
        />
      </div>
    </div>
  );
};

export default SearchComponent;
