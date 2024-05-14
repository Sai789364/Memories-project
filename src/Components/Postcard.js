import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import postContext from "../context/post/postContext";

const Postcard = ({ title, description, images, post , updatenote }) => {
  const {DeletePost} = useContext(postContext);

  const deletepost = () => {
    DeletePost(post._id);
  };
  return (
    <Card style={{ width: "18rem", margin: "20px" }}>
      {images.map((image) => {
        return <Card.Img src={image} key={image}></Card.Img>
      })}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <i className="fa-solid fa-trash-can mx-2" onClick={deletepost}></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updatenote(post)}></i>
      </Card.Body>
    </Card>
  );
};

export default Postcard;
