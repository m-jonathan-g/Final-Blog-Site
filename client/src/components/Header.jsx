import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

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
    <Navbar className="border-b-4 bg-blog sm:text-xl dark:bg-blog">
      {currentUser ? (
        <>
          <Navbar.Toggle className="text-white dark:text-white bg-none " />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={"/dashboard?tab=profile"}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/create-post"}>Editor</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/about"}>About</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        </>
      ) : (
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
      )}
      <div>
        <Link className="text-xl font-bold text-white whitespace-nowrap" to="/">
          WAGZ
        </Link>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link className="inline text-sm font-bold " to="/">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard?tab=dash"} as={"div"}>
          <Link className="inline text-sm font-bold " to="/dashboard?tab=dash">
            Dashboard
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/create-post"} as={"div"}>
          <Link className="inline text-sm font-bold" to="/create-post">
            Editor
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link className="inline text-sm font-bold " to="/about">
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <Button
        className="inline w-12 h-10 border-none"
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
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
        <AiOutlineSearch className="items-center justify-center text-2xl dark:text-white" />
      </Button>
    </Navbar>
  );
}
