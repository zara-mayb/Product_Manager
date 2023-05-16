import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = (props) => {
    const nav = useNavigate();

    //get the id from the :id in the route
    const {id} = useParams();

    //state vars for input
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

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

    //UPDATE form submit
    const updateProduct = (e) => {
        e.preventDefault();

        //create object to pass in
        const tempProduct = {
            title: title,
            price: price,
            description: description
        }
        axios.patch("http://localhost:8000/api/products/"+id, tempProduct)
            .then((serverRes) => {
                console.log("YES", serverRes)
                nav('/');
            })
            .catch((err) => {
                console.log("XXX", err)
            })
    }

    //DELETE product
    const deleteProduct = (productID) => {
        console.log("delete",productID)
        axios.delete("http://localhost:8000/api/products/"+ productID)
        .then((serverRes)=> {
            console.log(serverRes.data)
            nav('/');
        })
        .catch(err => console.log(err))
    }

    //NAV BACK TO MAIN PAGE
    const goBack = () => {
        nav(-1);
    }

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={updateProduct}>
                <div>
                    <label className='title'>Title:</label>
                    <input id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className='price'>Price:</label>
                    <input id='price' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label className='description' htmlFor="Description">Description:</label>
                    <input id='description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button>Update</button>
            </form>
            <button onClick={()=> deleteProduct(id)}>DELETE</button>
            <button onClick={() => goBack()}>Back to Main</button>
        </div>
    )
}

export default Update