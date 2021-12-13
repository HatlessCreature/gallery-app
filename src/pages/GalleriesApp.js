import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries, getGalleries, selectSearchTerm, setSearchUserId } from "../store/galleries";
import { useParams } from "react-router-dom";
import GalleryRow from "../components/GalleryRow";
import GallerySearch from "../components/GallerySearch";

export default function GalleriesApp({selfId} = null) {
    const galleries = useSelector(selectGalleries);
    const term = useSelector(selectSearchTerm);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        if(selfId){
            dispatch(setSearchUserId(selfId));
            dispatch(getGalleries({page: 1, term: null, userId: selfId}));
        }
        if(id){
            dispatch(setSearchUserId(id));
            dispatch(getGalleries({page: 1, term: null, userId: id}));
        }
        if(!id && !selfId){
            dispatch(setSearchUserId(null));
            dispatch(getGalleries({page: 1, term: null, userId: null}));
        }
    }, [selfId, id ,dispatch]);

    function handlePaginate(page) {
        if(selfId){
            dispatch(getGalleries({page: page, term: term, userId: selfId}));
        }
        if(id){
            dispatch(getGalleries({page: page, term: term, userId: id}));
        }
        if(!id && !selfId){
            dispatch(getGalleries({page: page, term: term, userId: null}));
        }
    }

    return (
        <div>
            <GallerySearch/>
            <h1>{selfId && ("My ")}{id && galleries.data.length ? (`${galleries?.data[0]?.user?.first_name}'s `) : (<></>)}Galleries</h1>

            {galleries?.data.length ? (
                <div>
                    <ul>
                        {galleries.data.map((gallery) => (
                            <GalleryRow key={gallery.id} gallery={gallery} />
                        ))}
                    </ul>
                    {galleries.current_page !== galleries.last_page && (
                        <button onClick={() => handlePaginate(galleries.current_page + 1)}>Load More</button>
                    )}
                </div>
            ) : (
                <div>There are no galleries to display.</div>
            )}
        </div>
    );
} 