import React, { useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

import { Deals } from "./components/Deals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import { Toaster } from "react-hot-toast";




const ProductsPage = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  const { category } = useParams();

  React.useEffect(() => {
    setSelectedCategory(category || "All");
  }, [category, setSelectedCategory]);

  const activeCategory = category || selectedCategory || "All";

  return (
    <ProductGrid
      selectedCategory={activeCategory}
      setSelectedCategory={setSelectedCategory}
      addToCart={addToCart}
    />
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('myToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('myUser')) || null);
  const location = useLocation();

  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('myToken'));
    setUser(JSON.parse(localStorage.getItem('myUser')) || null);
  }, [location]);

 
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

 
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar
        totalItems={totalItems}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      <Routes>
       
        <Route
          path="/"
          element={           
            <PrivateRoute>
              <>
                <Hero />
                <Categories
                  setSelectedCategory={setSelectedCategory}
                />
              </>
            </PrivateRoute>
          }
        />

        
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            </PrivateRoute>
          }
        />

        
        <Route
          path="/products/:category"
          element={
            <PrivateRoute>
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            </PrivateRoute>
          }
        />
     
  <Route 
  path="/Deals"
   element={
    <PrivateRoute>
      <Deals addToCart={addToCart} />
    </PrivateRoute>
    } />

        <Route path="/product/:id" element={<PrivateRoute><ProductDetail addToCart={addToCart} /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        
        <Route
          path="*"
          element={
            <div style={{ padding: "40px", textAlign: "center" }}>
              <h2>404 - Page Not Found</h2>
              <p>This page doesn’t exist.</p>
            </div>
          }
        />
      </Routes>

     
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          closeCart={() => setIsCartOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;