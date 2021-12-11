import { Link, useParams } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGallery, selectGallery } from "../store/galleries";
import useFormattedDate from '../hooks/useFormattedDate';
import { Carousel } from "react-bootstrap";

export default function GalleryApp(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);
    const formattedDate = useFormattedDate(gallery ? gallery.created_at : "", "dd-MM-yyyy HH:mm");

    useEffect(() => {
        dispatch(getGallery(id));
    }, [id, dispatch])

    return (
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
                                <Carousel.Item key={image.id}>
                                    <a key={index} target="_blank" href={image.url}>
                                        <img key={image.id} src={image.url} alt="Gallery carousel element"/>
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
      

    );
}