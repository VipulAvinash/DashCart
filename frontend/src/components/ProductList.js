import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const ProductList =()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async ()=>{
        let result = await fetch('https://dashcart.onrender.com/products');
        result = await  result.json();
        setProducts(result);
    }
        const deleteProduct = async (id)=>{
           let result = await fetch(`https://dashcart.onrender.com/product/${id}`,
            {
                method: "Delete",
            });
            result = await result.json();
            if(result)
            {
                alert("Record is Deleted");
                getProducts();
            }

        }
        const searchHandle = async (event)=>{
            let key = event.target.value;
            if(key)
            {
                let result = await fetch(`https://dashcart.onrender.com/search/${key}`);
                result = await result.json();
                if(result)
                {
                    setProducts(result);
                }
            }    
                else
                {
                    getProducts();
                }
         
        }
    return(
        <div className = "product-list">
            <h3>Product List </h3>
            <input className='search-product-box' type = 'text' placeholder='Search Product'
            onChange={searchHandle} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                <ul key = {item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>    
                    <button onClick = {()=>deleteProduct(item._id)} >Delete</button>
                     <Link to ={'/update/'+item._id} >Update</Link>
                    </li>
                </ul>
                )
                : <h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;
