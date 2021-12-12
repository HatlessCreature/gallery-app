import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectGallery, createGallery, editGallery } from "../store/galleries";
import { selectActiveUser } from "../store/auth";

export default function CreateGallery() {
    const dispatch = useDispatch();
    const retrievedGallery = useSelector(selectGallery);
    const { id } = useParams();
    const [newGallery, setNewGallery] = useState({
        title: "",
        description: "",
        images: []
    });
    const [newImages, setNewImages] = useState([{
        url: ""
    }]);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (id) {
            dispatch(editGallery(id, newGallery))
        } else {
            dispatch(createGallery(newGallery))
        }
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...newImages];
        list[index][name] = value;
        setNewImages(list);
    }

    const handleRemoveClick = index => {
        const list = [...newImages];
        list.splice(index, 1);
        setNewImages(list);
    }

    const handleAddClick = () => {
        setNewImages([...newImages, { url: "" }]);
    }

    useEffect(() => {
        setNewGallery({
            ...newGallery,
            images: newImages
        })
    }, [newImages])

    useEffect(() => {
        if(id){
            setNewGallery(retrievedGallery);
        }
    }, [id])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 style={{ padding: "10px" }}>{id ? "Edit Gallery" : "Create Gallery"}</h2>
                <div style={{ padding: "10px" }}>
                    <input required type="text" id="title" placeholder="Title" value={newGallery.title} 
                    onChange={({ target }) =>
                    setNewGallery({ ...newGallery, title: target.value })}/>
                </div>
                <div style={{ padding: "10px" }}>
                    <textarea cols="50" rows="4" type="text" id="description" placeholder="Description" value={newGallery.description} 
                    onChange={({ target }) =>
                    setNewGallery({ ...newGallery, description: target.value })}/>
                </div>
                {newImages.map((x, i) => {
                    return (
                        <div>
                            <input required name="url" value={x.url} placeholder="Image url goes here" onChange={e => handleInputChange(e, i)}/>
                            <span>
                                {newImages.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </span>
                            <div>
                                {newImages.length - 1 === i && <button onClick={handleAddClick}>Add more</button>}
                            </div>
                        </div>
                    )
                })}

                <button type="submit">{id ? "Edit" : "Submit"}</button>
            </form>

        </div>
    );
}