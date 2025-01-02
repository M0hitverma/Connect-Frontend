import React, { useRef, useState } from "react";
import { addPostRequest } from "@/api/CommonApi";
import { IoClose } from "react-icons/io5";


const AddPostModal = ({ closeModal, setPosts }) => {
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [addedFlag, setAddedFlag] = useState(false);
  const [post, setPost] = useState({
    imageurl: "",
    desc: "",
  });
  const handleClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  };
  const addPostHandler = async () => {
    setLoading(true);
    const response = await addPostRequest(post);
    if (response.ok) {
        setPosts((prevPosts)=>([ response.post, ...prevPosts] ));
      setLoading(false);
      setAddedFlag(true);
      setTimeout(() => {
        setAddedFlag(false)
        closeModal()
      }, 1000);
      setPost({
        imageurl: "",
        desc: ""
      })
    }
    setLoading(false);
  };

  return (
    <div
      ref={modalRef}
      onClick={handleClick}
      className="fixed inset-0 bg-black  bg-opacity-30 flex items-center justify-center"
    >
      <div className="md:w-[26rem] w-[95vw] bg-white rounded-lg flex flex-col gap-5 pb-6 ">
        <div className="flex flex-row  justify-between text-xl gap-5 px-8 py-4 border-b-[1px] border-gray-200">
          <h1 className="font-semibold">Add Post</h1>
          <button className=" opacity-20" onClick={closeModal}>
            <IoClose size={26} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 py-4">
          <div className="bg-gray-100 p-2 rounded-md flex justify-between flex-row items-center relative">
            <input
              name="imageurl"
              id="imageurl"
              className=" bg-transparent flex-1 outline-none text-base p-2"
              type="text"
              placeholder="Media URL"
              value={post.imageurl}
              onChange={handleOnChange}
            />
          </div>
          <div className="bg-gray-100 p-2 rounded-md flex justify-between flex-row items-center relative">
            <textarea
              name="desc"
              id="desc"
              rows={4}
              className=" bg-transparent flex-1 outline-none text-base p-2"
              type="text"
              placeholder="Write something..."
              value={post.desc}
              onChange={handleOnChange}
            />
          </div>
          <button
            className={`${addedFlag? "bg-green-500" :" bg-blue-500"} py-4 rounded-md font-semibold  text-white relative`}
            onClick={addPostHandler}
            disabled={loading}
          >
            {loading ? (
              <span> Adding Post...</span>
            ) : addedFlag ? (
              <span>  Post Added! </span>
            ) : (
              <span> Add Post</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPostModal;
