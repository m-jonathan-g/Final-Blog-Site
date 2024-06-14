import { FaHome, FaPen, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function FooterCom() {
  return (
    <footer className="sticky bottom-0 inline-flex items-center justify-center w-full p-8 md:hidden bg-light dark:bg-blog ">
      <Link
        className="flex justify-center mr-5 text-xl font-bold text-center dark:text-gray-600"
        to="/"
      >
        <FaHome className="text-2xl dark:text-gray-600" />
        Home
      </Link>
      <Link
        className="flex justify-center mr-5 text-xl font-bold text-center dark:text-gray-600"
        to="/search"
      >
        <FaSearch className="text-2xl dark:text-gray-600" />
        Browse
      </Link>
      <Link
        className="flex justify-center mr-5 text-xl font-bold text-center dark:text-gray-600"
        to="/create-post"
      >
        <FaPen className="text-2xl dark:text-gray-600" /> Write
      </Link>
    </footer>
  );
}
