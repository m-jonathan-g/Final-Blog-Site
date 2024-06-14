import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="  sm:text-xl dark:text-white bg-blog">
      <div>
        <Link className=" font-extrabold p-3 my-7 whitespace-nowrap text-3xl text-black " to="/">
        ✒️ Bloggy<span className="text-white">BG</span>
        </Link>
        
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link className="hidden text-2xl font-bold md:inline text-black p-3 hover:underline decoration-2 hover:text-opacity-80" to="/">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard"} as={"div"}>
          <Link
            className="hidden text-2xl text-black p-3 font-bold md:inline hover:underline decoration-2 hover:text-opacity-80"
            to="/dashboard?tab=dash"
          >
            Dashboard
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/create-post"} as={"div"}>
          <Link
            className="hidden font-bold md:inline text-black p-3 text-2xl hover:underline decoration-2 hover:text-opacity-80"
            to="/create-post"
          >
            Editor
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link className="hidden font-bold md:inline text-2xl text-black p-3 hover:underline decoration-2 hover:text-opacity-80" to="/about">
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" img={currentUser.profilePicture} rounded  />}
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block text-sm font-medium truncate">
              {currentUser.email}
            </span>
          </Dropdown.Header>
          <Link to={"/dashboard?tab=profile"}>
            <Dropdown.Item>Profile</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/sign-in">
          <Button className="bg-blog hover:opacity-70" outline>
            Sign In
          </Button>
        </Link>
      )}

      <Button
        className="inline w-12 h-10"
        color="gray"
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? <FaSun /> : <FaMoon />}
      </Button>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden opacity-70 md:inline"
        />
      </form>

      <Button
        onClick={handleSubmit}
        className="w-12 h-12 md:hidden"
        pill
        color="gray"
      >
        <AiOutlineSearch className="items-center justify-center text-2xl" />
      </Button>
    </Navbar>
  );
}
