import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries, getGalleries } from "../store/galleries";
import GalleryRow from "../components/GalleryRow";

export default function GalleriesApp() {
    const galleries = useSelector(selectGalleries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGalleries());
    }, [dispatch]);

    return (
        <div>
            <h1>Galleries</h1>

            {galleries?.data.length ? (
                <ul>
                    {galleries.data.map((gallery) => (
                        <GalleryRow key={gallery.id} gallery={gallery} />
                    ))}
                </ul>
            ) : (
                <div>There are no galleries that meet the search term.</div>
            )}
        </div>
    );
} 