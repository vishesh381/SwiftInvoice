import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});
    const [cartItems, setCartItems] = useState([]);

    // Extract fetching categories into a function
    const loadCategories = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };
    const loadItems = async () => {
  try {
    const response = await fetchItems();
    setItemsData(response.data);
  } catch (err) {
    console.error("Failed to load items", err);
  }
};

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }
            await loadCategories();
             await loadItems();
            const itemResponse = await fetchItems();
            setItemsData(itemResponse.data);
        }
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({token, role});
    };

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item, quantity: newQuantity} : item));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Include loadCategories in context so other components can trigger refresh
    const contextValue = {
        categories,
        setCategories,
        loadCategories,  // <-- here
        loadItems,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
