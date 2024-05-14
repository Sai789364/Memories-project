import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const Addpost = () => {
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  const onDrop = (files) => {
    files.map((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPost({...post, images: [...post.images, e.target.result]})
      }
      reader.readAsDataURL(file)
    })
  }
  const [post, setPost] = useState({ title: "", description: "", images: [] });
  console.log(post);
  const navigate = useNavigate();
  const {getInputProps, getRootProps} = useDropzone({onDrop})
  const handleAddPost = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/post/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();
      navigate("/")
      console.log("New post added:", data);

      setPost({ title: "", description: "", images: [] });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container my-3">
      <h2>Add a Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={post.description}
            onChange={onChange}
          />
        </div>
        <div {...getRootProps({className: "mb-3", style: baseStyle})}>
          <label htmlFor="images" className="form-label">
            Image
          </label>
          <input type="file"
            className="form-control"
            {...getInputProps({className: "bg-dark"})}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddPost}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addpost;
