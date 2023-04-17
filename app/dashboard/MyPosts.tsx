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
    return <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }

  if (error) {
    return <div>Error while getting</div>;
  }

  // console.log(data?.Post);

  return (
    <div>
      {data?.posts?.map((post: any) => (
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
