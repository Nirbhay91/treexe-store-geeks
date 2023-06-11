import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import ShoppingCart from "./ShoppingCart"; // Import the ShoppingCart component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    colour: [],
    priceRange: [],
    type: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (filterType, value) => {
    const newFilters = { ...filters };
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(
        (item) => item !== value
      );
    } else {
      newFilters[filterType].push(value);
    }
    setFilters(newFilters);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = (product) => {
    if (
      (filters.gender.length > 0 && !filters.gender.includes(product.gender)) ||
      (filters.colour.length > 0 && !filters.colour.includes(product.colour)) ||
      (filters.priceRange.length > 0 &&
        !filters.priceRange.includes(product.priceRange)) ||
      (filters.type.length > 0 && !filters.type.includes(product.type))
    ) {
      return false;
    }
    if (searchQuery.trim() === "") {
      return true;
    }
    const searchKeywords = searchQuery.trim().toLowerCase().split(" ");
    const attributesToSearch = [product.gender, product.colour, product.type]
      .join(" ")
      .toLowerCase();
    return searchKeywords.every((keyword) =>
      attributesToSearch.includes(keyword)
    );
  };

  const renderProductList = () => {
    return products.filter(filterProducts).map((product) => (
      <div key={product.id} className="product-item">
        <img
          src={
            "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png"
          }
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <p>Price: {product.price}</p>
        <button className="Add-to-Cart" onClick={() => addToCart(product.id)}>
          Add to Cart
        </button>
      </div>
    ));
  };

  const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      const existingCartItem = cartItems.find((item) => item.id === productId);
      if (existingCartItem) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <h4>Filters</h4>
        <div>
          <h5>Gender</h5>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("gender", "Male")}
            />
            Male
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("gender", "Female")}
            />
            Female
          </label>
        </div>
        <div>
          <h5>Colour</h5>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("colour", "Red")}
            />
            Red
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("colour", "Blue")}
            />
            Blue
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("colour", "Blue")}
            />
            Green
          </label>
        </div>
        <div>
          <h5>Price Range</h5>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("priceRange", "Low")}
            />
            0-250
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("priceRange", "Medium")}
            />
            Rs251-450
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("priceRange", "High")}
            />
            Rs 450
          </label>
        </div>
        <div>
          <h5>Type</h5>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("type", "Shirt")}
            />
            Polo
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("type", "Pants")}
            />
            Hoodie
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("type", "Pants")}
            />
            Basic
          </label>
        </div>
      </div>
      <div className="product-list">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {renderProductList()}
      </div>
      <div className="shopping-cart-container">
        <ShoppingCart
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default ProductList;
