"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../Common/PostCard";
import { getUserPosts } from "@/api/CommonApi";
import MainModal from "../Modal/MainModal";
const UserPostContainer = ({ userId }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getUserPosts({ page });

      if (response.ok && response?.posts) {
        setPosts((prevPosts) => [...prevPosts, ...response.posts]);
      } else {
        console.log(response);
      }
    };
    fetchPosts();
  }, [page]);

  const filterPosts = (postId) => {
    const filteredPosts = posts.filter((post) => post._id != postId);
    setPosts(filteredPosts);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-5">
      <div className=" w-[90%] px-3 ">
        <button
          onClick={() => setShowModal(true)}
          className=" bg-gray-100 shadow-inner text-xl px-4 py-2 text-gray-400 hover:text-gray-600"
        >
          + Add Post
        </button>
      </div>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-3 w-[90%] md:px-10 px-3 py-6 bg-orange-50 rounded-2xl">
          {posts.map((post, index) => (
            <div key={index}>
              <PostCard post={post} userId={userId} filterPosts={filterPosts} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[90%]  h-[40vh] bg-gray-100  shadow-inner rounded-3xl flex flex-col items-center justify-center p-3 text-center">
          <h2 className="text-xl font-semibold">Oops! No posts yet.</h2>
          <p className="font-sm text-gray-500">
            Start by creating your first post and sharing your thoughts with the
            world!
          </p>
        </div>
      )}

      {showModal && (
        <MainModal
          closeModal={() => setShowModal(false)}
          type="AddPostModal"
          post={posts}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};
export default UserPostContainer;
