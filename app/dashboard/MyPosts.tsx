"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/post/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, error, isLoading } = useQuery<AuthPosts>({
    queryKey: ["auth-Posts"],
    queryFn: fetchAuthPosts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while getting</div>;
  }

  console.log(data?.Post);

  return (
    <div>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
