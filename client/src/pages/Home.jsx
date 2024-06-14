import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full gap-6 px-3  mt-0 p-28 bg-blog">
        <h1 className="text-6xl font-bold lg:text-6xl text-black ">
          Welcome to <span className="text-white">Bloggy</span>
        </h1>
        <p className="text-2xl p-2 mx-2 text-black-90 font-bold">
          Your go-to destination for insightful articles, engaging stories, and
          thought-provoking discussions. You can expect to find articles on writing, design, and entrepreneurship, as well as tips and resources to help you achieve your creative goals.Bloggy is for everyone.
        </p>
        <Link
          to="/search"
          className="text-3xl font-bold text-white sm:text-2xl hover:text-black hover:bg-white p-2 bg-black"
        >
          View all posts 
        </Link>
      </div>

      <div className="flex flex-col w-full gap-8 p-3 mx-auto py-7 bg-none ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-center text-teal-500 hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
