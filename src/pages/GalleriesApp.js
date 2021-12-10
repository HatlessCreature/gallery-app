import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries, getGalleries, selectSearchTerm } from "../store/galleries";
import GalleryRow from "../components/GalleryRow";
import GallerySearch from "../components/GallerySearch";

export default function GalleriesApp() {
    const galleries = useSelector(selectGalleries);
    const term = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGalleries());
    }, [dispatch]);

    function handlePaginate(page) {
        dispatch(getGalleries({page: page, term: term}));
    }

    return (
        <div>
            <GallerySearch/>
            <h1>Galleries</h1>

            {galleries?.data.length ? (
                <div>
                    <ul>
                        {galleries.data.map((gallery) => (
                            <GalleryRow key={gallery.id} gallery={gallery} />
                        ))}
                    </ul>
                    {galleries.current_page > 1 && (
                        <button onClick={() => handlePaginate(galleries.current_page - 1)}>Last Page</button>
                    )}    
                    {galleries.current_page !== galleries.last_page && (
                        <button onClick={() => handlePaginate(galleries.current_page + 1)}>Next Page</button>
                    )}
                </div>
            ) : (
                <div>There are no requested galleries.</div>
            )}
        </div>
    );
} 