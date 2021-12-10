import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries, getGalleries, selectSearchTerm, selectSearchUserId, setSearchUserId } from "../store/galleries";
import { selectActiveUser, selectIsAuthenticated } from "../store/auth";
import GalleryRow from "../components/GalleryRow";
import GallerySearch from "../components/GallerySearch";

export default function GalleriesApp({searchMyGalleries} = null) {
    const galleries = useSelector(selectGalleries);
    const term = useSelector(selectSearchTerm);
    const activeUser = useSelector(selectActiveUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchUserId(searchMyGalleries));
    }, [searchMyGalleries]);


    useEffect(() => {
        dispatch(getGalleries({page: 1, term: term, userId: searchMyGalleries}));
    }, [searchMyGalleries ,dispatch]);

    function handlePaginate(page) {
        dispatch(getGalleries({page: page, term: term, userId: searchMyGalleries}));
    }

    return (
        <div>
            <GallerySearch/>
            <h1>{searchMyGalleries && ("My ")}Galleries</h1>

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