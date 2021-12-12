import { Link, useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGallery, selectGallery, createComment, deleteComment} from "../store/galleries";
import useFormattedDate from '../hooks/useFormattedDate';
import { Carousel } from "react-bootstrap";
import { format } from 'date-fns';
import { selectIsAuthenticated, selectActiveUser } from "../store/auth";

export default function GalleryApp(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);
    const formattedDate = useFormattedDate(gallery ? gallery.created_at : "", "dd-MM-yyyy HH:mm");
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
    const [newComment, setNewComment] = useState(
        {content: ""});

    useEffect(() => {
        dispatch(getGallery(id));
    }, [id, dispatch]);

    const handleContentChange = (e) => {
        setNewComment({ ...newComment, content: e.target.value});
    };

    const handleAddNewComment = (e) => {
        e.preventDefault();
        dispatch(createComment({ content: newComment, galleryId: id}));
    }

    const handleDeleteComment = (id) => {
        const response = prompt("Are you sure you want to delete your comment? If so, type'yes'");
        if (response !== "yes"){
            return;
        }
        dispatch(deleteComment(id));
    }

    return (
        <div>
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "start",
                alignItems: "center",
                border: "solid",
                margin: "5px"
                }}
            >
            {gallery ? (
                <>
                    <h1 style={{ padding: "10px" }}>
                      {gallery?.title}
                    </h1>

                    <h3 style={{ padding: "10px" }}>
                      By: <Link to={`/authors/${gallery?.user?.id}`}>{gallery?.user?.first_name} {gallery?.user?.last_name}</Link>
                    </h3>

                    {formattedDate === "unknown" ? (
                        <div style={{ padding: "10px" }}>
                        Unknown date
                      </div>
                      ) : (
                          <div style={{ padding: "10px" }}>
                          Created at: {formattedDate}
                        </div>
                      )}

                    <div style={{ padding: "10px" }}>
                        <Carousel>
                            {gallery.images && gallery.images.length ?
                                gallery.images.map((image, index) => (
                                    <Carousel.Item key={image.id} >
                                        <a key={index} target="_blank" href={image.url}>
                                            <img key={image.id} src={image.url} alt="Gallery carousel element" style={{maxHeight:"768px" , maxWidth:"1024px"}}/>
                                        </a>
                                    </Carousel.Item>
                                )) :
                                "No images found"
                            }
                        </Carousel>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
                )}

            </div>

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "start",
                alignItems: "center",
                border: "solid",
                margin: "5px"
                }}
                >
                {gallery && gallery.comments ? (
                    <>
                        {gallery.comments.length ? (<h4>Comments</h4>) : (<h4>No Comments</h4>)}
                        <ul style={{listStyleType: "none"}}>
                            {gallery.comments.map((comment) => (
                                <li key={comment.id} id={`comment${comment.id}`}>
                                    <div>{comment.user.first_name} {comment.user.last_name}</div>
                                    <div>{format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}</div>
                                    <p>{comment.content}</p>
                                    {activeUser && (activeUser.id === comment.user.id) ? (
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
                                    ) : (
                                        <></>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <></>
                )}

                {isAuthenticated && (
                    <form onSubmit={handleAddNewComment}>
                        <textarea required rows="4" cols="50" onChange={handleContentChange} value={newComment.content} placeholder="Enter comment" />
                        <button >Create comment</button>
                    </form>
                )}
            </div>
            
        </div>

    );
}