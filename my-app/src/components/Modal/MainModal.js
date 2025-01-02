import React, { useState } from "react";
import  AddPostModal  from "./AddPostModal";
const MainModal = ({ closeModal, type, posts, setPosts }) => {


  return (
    <>
      {type === "AddPostModal" && (
        <AddPostModal
          closeModal={closeModal}
          posts ={posts}
          setPosts = {setPosts}
        />
      )}

    
    </>
  );
};
export default MainModal;