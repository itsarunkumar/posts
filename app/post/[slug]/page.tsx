"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { PostType } from "../../types/Post";

const fetchDetails = async (slug: string) => {
  const { data } = await axios.get(`/api/post/${slug}`);
  return data;
};

export default function PostDetails(url: any) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url?.params?.slug),
  });
  if (isLoading) return <div>Loading...</div>;
  // console.log(data);
  return (
    <div>
      <h1>Post by {data?.user?.name}</h1>
      <Post
        id={data?.id}
        name={data?.user?.name}
        avatar={data?.user?.image}
        postTitle={data?.title}
        comments={data?.comment}
      />
      <AddComment id={data?.id} />
      <div className="w-full h-full rounded-xl ">
        <span>Comments for post by {data?.user?.name}:</span>
        {data?.comment?.map((comment: any) => (
          <div
            key={comment.id}
            className="w-full h-full py-4 px-2  rounded-xl text-start bg-slate-800 text-white my-2"
          >
            <div className="flex items-center gap-2 ">
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={comment.user.image}
                alt="avatar"
              />
              <span>{comment.user.name}</span>
            </div>

            <p className="py-2">- {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
