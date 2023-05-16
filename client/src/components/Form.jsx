import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

const Form = (props) => {
    //state vars for input
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 

    //state var for db
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then((serverRes) => {
                console.log("SERVER SUCCES", serverRes.data)
                setProducts(serverRes.data)
            })
            .catch(err => {
                console.log("SERVER ERROR XXXX", err)
            })
    }, [])

    //form submit
    const createProduct = (e) => {
        e.preventDefault();

        //create object to pass in
        const tempProduct = {
            title: title,
            price: price,
            description: description
        }
        axios.post("http://localhost:8000/api/products", tempProduct)
            .then((serverRes) => {
                console.log("YES", serverRes)
                setProducts([...products, serverRes.data])
            })
            .catch((err) => {
                console.log("XXX", err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });
    }
    return (
        <fieldset>
            <form onSubmit={createProduct}>
                {products.map((product) => {
                    return (
                        <li key={product._id}>
                            <Link to={`/products/${product._id}`}> {product.title} - ${product.price}</Link>
                            <Link to={`/products/${product._id}/edit`}> | edit </Link>
                        </li>
                    );
                })}
                <div>
                    <label className='title'>Title:</label>
                    <input id='title' type="text" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className='price'>Price:</label>
                    <input id='price' type="number" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label className='description' htmlFor="Description">Description:</label>
                    <input id='description' type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button>Create</button>
            </form>
            <div> {errors.map((err, index) => <p style={{color: "red"}} key={index}>{err}</p>)}</div>
        </fieldset>
    )
}

export default Form