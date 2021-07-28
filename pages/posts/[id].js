/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";
import { Header } from "../index";

export default function Post({ post }) {
  const router = useRouter();
  return (
    <div>
      <Header title={`${post.title} by ${post.user_email}`}/>
      <h1 className="text-5xl font-semibold tracking-wide">{post.title}</h1>
      <p className="text-sm text-gray-500 my-4">by {post.user_email}</p>
      <div>
        <ReactMarkdown className="prose" children={post.content} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("posts").select("id");
  const paths = data.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const { id } = ctx.params;
  const { data } = await supabase
    .from("posts")
    .select()
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      post: data,
    },
  };
}
