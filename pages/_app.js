import Link from "next/link";
import Router from "next/router";
import { supabase } from "../api";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = supabase.auth.user();
    console.log(user);
    setUser(user);
  }

  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/">
          <a className="mr-6 cursor-pointer">Home</a>
        </Link>
        {user && (
          <>
            <Link href="/create-post">
              <a className="mr-6 cursor-pointer">Create Post</a>
            </Link>
            <Link href="/my-posts">
              <a className="mr-6 cursor-pointer">My Posts</a>
            </Link>
          </>
        )}
        <Link href="/profile">
          <a className="mr-6 cursor-pointer">Profile</a>
        </Link>
      </nav>
      <div className="sm:py-8 px-4 sm:px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
