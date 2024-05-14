import React, { useState, useEffect ,useRef, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "../Components/Postcard";
import postContext from "../context/post/postContext";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  const context=useContext(postContext)
  const {editPost, posts, setPosts}=context;

  useEffect(() => {
    fetch("http://localhost:5000/api/post/fetchallposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);


  const ref = useRef(null);
  const refclose = useRef(null);
  const [note,setnote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id , etitle:currentnote.title , edescription:currentnote.description , eimages:currentnote.images})
  };

  const handleclick=(e)=>{
    console.log("Updating the note",note)
    editPost(note.id,note.etitle,note.edescription,note.eimages)
    refclose.current.click()
}

const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="eimage" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="eimage"
                    name="eimage"
                    onChange={onchange} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <Row className="justify-content-md-center">
          {posts.map((post) => (
            <Col key={post._id} md="auto">
              <PostCard
                title={post.title}
                description={post.description}
                images={post.images}
                post={post}
                updatenote={updatenote}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
