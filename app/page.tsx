"use client";

import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./components/Post";
import Comments from "./components/Comments";

const allPosts = async () => {
  const data = await axios.get("/api/post/getPosts");
  return data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: allPosts,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;
  // console.log(data);

  return (
    <main>
      <AddPost />
      {data?.data.map((post: any) => (
        <Post
          key={post.id}
          id={post.id}
          postTitle={post?.title}
          name={post?.user?.name}
          avatar={post?.user?.image}
          comments={post?.comment}
        />
      ))}
    </main>
  );
}
