import { useState } from "react";
import postContext from "./postContext";

const PostState = (props) => {
  const host="http://localhost:5000"
  const notesinitial = []
  const [posts, setPosts] = useState(notesinitial);

  const DeletePost = async (id) => {
    const response = await fetch(
      `${host}/api/post/deletepost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
  
    console.log("the note is deleting " + id);
    const newPosts = posts.filter((post) => {
      return post._id !== id
    })
    console.log(newPosts);
    setPosts(newPosts);
  };
  
  const editPost = async (id, title, description, images) => {
    const response = await fetch(
      `${host}/api/post/updatepost/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,images}),
      }
    );
    
    const jsonData = await response.json();
    console.log(jsonData);

    const newpost=JSON.parse(JSON.stringify(posts))
    for (let index = 0; index < newpost.length; index++) {
      const element = newpost[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.images = images;
        break;
      }
    }
    setPosts(newpost)
  };

  return (
    <postContext.Provider value={{posts, setPosts,DeletePost , editPost}}>
      {props.children}
    </postContext.Provider>
  )
}

export default PostState
