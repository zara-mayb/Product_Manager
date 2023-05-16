import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ShowOne = () => {
    const nav = useNavigate();
    //state vars to display
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    //get the id from the :id in the route
    const {id} = useParams();

    //USEEFFECT
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then((serverRes) => {
            console.log(serverRes.data)
            setTitle(serverRes.data.title)
            setPrice(serverRes.data.price)
            setDescription(serverRes.data.description)
        })
        .catch((err) => console.log(err) )
    }, [id])

    //NAV BACK TO MAIN PAGE
    const goBack = () => {
        nav(-1);
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>{price}</p>
            <em>description: {description} </em>
            <button onClick={() => goBack()}>Back to Main</button>
        </div>
    )
}

export default ShowOne