import { useDispatch, useSelector } from "react-redux";
import { getGalleries, selectSearchUserId, setSearchTerm } from "../store/galleries";
import { selectSearchTerm, setSearchUserId } from "../store/galleries";

export default function GallerySearch() {
    const term = useSelector(selectSearchTerm);
    const userId = useSelector(selectSearchUserId);
    const dispatch = useDispatch();

    function handleChangeSearchTerm(event) {
        dispatch(setSearchTerm(event.target.value));
    }

    function handleSearch() {
        dispatch(getGalleries({page: 1, term: term, userId: userId}));
    }

    return (
        <div>
            <input type="text" onChange={handleChangeSearchTerm} placeholder="Input search term here" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}