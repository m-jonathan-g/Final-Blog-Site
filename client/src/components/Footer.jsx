import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className=" bg-blog">
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid justify-between w-full sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="font-extrabold p-3 my-7 whitespace-nowrap text-3xl text-black"
            >
              Bloggy <span className="text-white">BG</span>
            </Link>
          </div>
          <div>
            <div className="inline text-black">
              <Footer.LinkGroup row>
                <Footer.Link
                  href="/dashboard?tab=dash"
                  rel="noopener noreferrer"
                  className="mr-10 "
                >
                  Dashboard
                </Footer.Link>
                <Footer.Link
                  className="mr-10 "
                  href="/create-post"
                  rel="noopener noreferrer"
                >
                  Editor
                </Footer.Link>
                <Footer.Link
                  className="mr-10"
                  href="/about"
                  rel="noopener noreferrer"
                >
                  About us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Bloggy"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon href="facebook.com" icon={BsFacebook} />
            <Footer.Icon href="instagram.com" icon={BsInstagram} />
            <Footer.Icon href="x.com" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
