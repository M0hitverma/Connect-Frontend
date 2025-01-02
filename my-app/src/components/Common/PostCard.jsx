import React, { useState } from "react";
import Image from "next/image";
import { BiSolidLike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { likePostRequest, commentPostRequest } from "@/api/CommonApi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { deletePostRequest } from "@/api/CommonApi";
import { MdAutoDelete } from "react-icons/md";
const PostCard = ({ post, userId,filterPosts }) => {
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(post.isLikedByUser);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [check, setCheck] = useState(false);
  
  const displayDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
const formatedDate = displayDate(post.createdAt);

  const handleLike = async () => {
    const response = await likePostRequest({ postId: post._id, isLiked });
    if (response.ok) {
      if (isLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    }
  };

  const handleComment = async () => {
    setLoading(true);
    const response = await commentPostRequest({ postId: post._id, comment });
    if (response.ok) {
      setCommentCount((prev) => prev + 1);
      setComment("");
      setCheck(true);
      setTimeout(() => {
        setCheck(false);
      }, 1000);
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    setDeleteLoader(true);
    const response = await deletePostRequest(post._id);
    if (response.ok) {
      filterPosts(post._id);
      console.log("deleted");
        }
    setDeleteLoader(false);
  };

  return (
    <div className="flex flex-col bg-white border-[1px]  px-4 rounded-lg relative ">
      {userId && (
        <div className="absolute top-5 right-2">
          <button
            onClick={handleDelete}
            disabled={deleteLoader}
            className="text-xl text-red-600"
          >
            {deleteLoader ? <MdAutoDelete /> : <MdDelete />}
          </button>
        </div>
      )}
      <div>
        {post.ownerName &&
          <div className="md:text-2xl text-base font-medium mt-4 ">{post.ownerName}</div>
        }
        {post.createdAt && <p className="text-sm text-gray-400">{formatedDate}</p>}
        {post.content?.desc && (
          <p className="text-xl my-4 ">{post.content.desc}</p>
        )}
        <div className="flex justify-between flex-row">
          <div className="flex flex-row items-center">
            <IoHeartCircleSharp className="text-xl text-red-600" />
            <span>{likeCount}</span>
          </div>
          <span>{commentCount} comments</span>
        </div>
      </div>
      <div className="flex flex-row border-t-[1px] items-center text-lg ">
        <button
          onClick={handleLike}
          className="w-1/2 p-2 flex flex-row items-center justify-center gap-2"
        >
          {isLiked ? (
            <BiSolidLike className="text-xl" />
          ) : (
            <BiLike className="text-xl" />
          )}
          <span>Like</span>{" "}
        </button>
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="w-1/2 p-2 flex flex-row justify-center items-center gap-2"
        >
          <BiCommentDetail className="text-xl" />
          <span>Comment</span>
        </button>
      </div>
      {showCommentForm && (
        <div className="flex flex-row border-t-[1px] justify-between">
          <input
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment"
            className=" p-2 w-full  border-gray-300 outline-none"
          />
          {!loading ? (
            check ? (
              <div className="py-2">Added!</div>
            ) : (
              <button onClick={handleComment} className="text-xl">
                <PiPaperPlaneRightFill />
              </button>
            )
          ) : (
            <div className="py-2">Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};
export default PostCard;
