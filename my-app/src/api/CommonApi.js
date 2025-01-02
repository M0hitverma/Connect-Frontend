const origin = process.env.NEXT_PUBLIC_BASE_URL;

export const getPosts = async ({ page = 1 }) => {
  const getPostUrl = `${origin}/post?page=${page}`;
  try {
    return await fetch(getPostUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 1000 * 60 * 60,
      },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("GetPost page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("GetPost page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
export const likePostRequest = async ({ postId, isLiked }) => {
  const likePostUrl = `${origin}/post/${postId}/like`;
  try {
    return await fetch(likePostUrl, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log("GetPost page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch {
    console.log("GetPost page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
export const commentPostRequest = async ({ postId, comment }) => {
  const commentPostUrl = `${origin}/post/${postId}/comment`;
  try {
    return await fetch(commentPostUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log("Comment request  Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("Comment request  Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
export const getUserPosts = async ({ page = 1 }) => {
  const getUserPostUrl = `${origin}/user/posts?page=${page}`;
  try {
    return await fetch(getUserPostUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 1000 * 60 * 60,
      },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("GetPost page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("GetPost page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
export const getUserRequest = async () => {
  const getUserUrl = `${origin}/user`;
  try {
    return await fetch(getUserUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("GetUser page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("GetUser page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
export const addPostRequest = async (post) => {
  const addPostUrl = `${origin}/post`;
  try {
    return await fetch(addPostUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("AddPost page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("AddPost page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};

export const deletePostRequest = async (postId) => {
  const deletePostUrl = `${origin}/post/${postId}`;
  try {
    return await fetch(deletePostUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("Delete Post Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("Delete Post Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again later",
    };
  }
};
