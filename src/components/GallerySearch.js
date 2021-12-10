import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGalleries } from "../store/galleries";

export default function GallerySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleSearch() {
        dispatch(getGalleries(searchTerm));
    }

    return (
        <div>
            <input type="text" onChange={handleChangeSearchTerm} placeholder="Input search term here" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}