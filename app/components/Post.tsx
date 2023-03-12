"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Comments from "./Comments";
import { useState } from "react";

type Prop = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments: any;
};

export default function Post({ id, name, avatar, postTitle, comments }: Prop) {
  console.log("--------------------");

  console.log(comments);
  console.log("--------------------");

  const [showComment, setShowComment] = useState(false);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-slate-800 my-8 p-8 rounded-lg "
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-white">{name}</h3>
      </div>
      <div className="my-8 text-white ">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer flex-col justify-start items-start">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
        <div>
          <button
            onClick={() => setShowComment(!showComment)}
            className="outline-1 bg-slate-600 font-light text-sm p-2 rounded-xl "
          >
            Show Commets
          </button>
          {showComment && <Comments comment={comments} />}
        </div>
      </div>
    </motion.div>
  );
}
