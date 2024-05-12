import { Link } from "react-router-dom";
import { isInCart } from "../helpers/cartHelpers";
// import { formatCurrency } from "../helpers/formatCurrency";
import { productsMock } from "../mocks/productsMock";
import { useCart, useCartDispatch } from "../store/cartContext";
import { CART_ACTIONS } from "../store/cartReducer";
import { Product } from "../types";
import { useEffect, useState } from "react";

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useCartDispatch();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      // normally we would fetch products from an API
      const products = await Promise.resolve(productsMock);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch &&
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: {
          product,
          quantity: 1,
        },
      });
  };

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <img
            src={product.imageUrl}
            alt={product.name}
            width="300"
            height="300"
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>R$ {product.price}</p>
          {isInCart(cartItems, product) ? (
            <Link to="/cart">Add para o carrinho</Link>
          ) : (
            <button onClick={() => handleAddToCart(product)}>
              + Add para o carrinho
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
