import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { StateContext } from "../../../contexts/StateProvider/StateProvider";

const CheckoutBookList = ({ book }) => {
  const { cart, setCart } = useContext(StateContext);
  const [cartCount, setCartCount] = useState(book?.quantity);

  const handleRemoveCartItem = id => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cartData.forEach(item => {
      if (item._id === book._id) {
        count += item.quantity;
      }
    });
    setCartCount(count);
  }, [cart]);

  const handleMinusClick = book => {
    const cartItem = cart.find(item => item._id === book._id);

    if (cartItem && cartItem.quantity > 0) {
      const updatedCart = cart.map(item => {
        if (item._id === book._id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.pricing.price * (item.quantity - 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });

      if (cartItem.quantity === 1) {
        // Remove item from cart if the quantity is 0 after decrementing
        const updatedCart = cart.filter(item => item._id !== book._id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      setCartCount(cartCount - 1);
    }
  };

  const handlePlusClick = book => {
    const cartItem = cart.find(item => item._id === book._id);
    if (cartItem) {
      const updatedCart = cart.map(item => {
        if (item._id === book._id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.pricing.price * (item.quantity + 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(cartCount + 1);
    } else {
      const newCartItem = {
        ...book,
        quantity: 1,
        totalPrice: book.pricing.price,
      };
      setCart([...cart, newCartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
      setCartCount(1);
    }
  };

  return (
    <div
      key="item._id"
      className="bg-[#FBFBFB] grid grid-cols-6 items-center px-5 py-3"
    >
      <div className="col-span-2 flex items-center gap-5">
        <img className="" src={book.images[0]} width={80} height={80} />
        <div>{book.name}</div>
      </div>
      <p>{book.pricing.price}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleMinusClick(book)}
          className="p-2 px-3 border"
        >
          <FaMinus />
        </button>
        <span>{book?.quantity}</span>
        <button
          onClick={() => handlePlusClick(book)}
          className="p-2 px-3 primary-btn"
        >
          <FaPlus />
        </button>
      </div>
      <p>{book.totalPrice}</p>
      <div className="flex">
        <button
          onClick={() => handleRemoveCartItem(book._id)}
          className="flex text-3xl text-red-500"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default CheckoutBookList;
