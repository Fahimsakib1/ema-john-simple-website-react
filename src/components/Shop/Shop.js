import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { AddToLocalStorageWithObject, getStoredCart } from '../../utilities/LocalStorage';

const Shop = () => {
    
    // Code for Fetching The data
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        fetch ('products.json')
        .then(res => res.json())
        .then (data => setProducts(data))
    },[]);


    useEffect( () => {
        const storedCart = getStoredCart();
        console.log(storedCart);

        const savedCart = [];
        for (const id in storedCart){
            console.log(id, storedCart[id]);
            
            const searchAddedProduct = products.find( product => product.id === id);
            if(searchAddedProduct){
                const quantity = storedCart[id];
                searchAddedProduct.quantity = quantity;
                console.log(searchAddedProduct);
                savedCart.push(searchAddedProduct);
            }
        }
        setCart(savedCart);
    },[products])




    //code for handleAddToCart Button
    // const [cart, setCart] = useState([]);
    const handleAddToCart = (selectedProduct) => {
        console.log("Button Clicked", selectedProduct);
        console.log("Previous Cart",cart);

        let newCart = []; 
        // Amra jokhon cart er moddhe product add korbo tokhon 1ta kore product add korbo.. jehetu 1ta kore product add hobe shei jonno cart.find use kora hoiche to get the single new product
        const existsProduct = cart.find(product => product.id === selectedProduct.id);

        if(!existsProduct){
            
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }

        //jodi cart er moddhe kono product thake, and product kintu onek gulao thakte pare and shei shob product k access korar jonno amra cart.filter use korlam karon loop ta onek gula product er moddhe hobe.. 
        else{
            const remainingProducts = cart.filter(product => product.id !== selectedProduct.id);
            existsProduct.quantity = existsProduct.quantity + 1;
            newCart = [...remainingProducts, existsProduct];
        }
        // Aita kora jabe na => cart.push(product);
        setCart(newCart);
        console.log("New Cart",newCart);
        AddToLocalStorageWithObject(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="parent-product-container">
                <h1 style={{textAlign:"center"}}> {products.length} Available Products</h1>
                <div className='products-container'>
                    {
                        products.map(product => <Product product = {product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
            </div>
            
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;