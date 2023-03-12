"use client";
import Image from "next/image";

export default function Comments(props: { comment: any[] }) {
  return (
    <div>
      <div className="bg-slate-800">
        <span className="text-neutral-100 font-bold ">Comments:</span>
        {props.comment?.map((comment: any) => (
          <div
            className="flex items-center gap-2 my-2 text-sm"
            key={comment.id}
          >
            <p className="flex items-center flex-row justify-start">
              <Image
                src={comment?.user.image}
                width={18}
                height={18}
                alt={comment?.user.name}
                className="rounded-full mr-2"
              />
              <span className="text-neutral-100 font-bold ">
                {comment.content}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
