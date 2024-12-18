import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext.jsx';
import toast from 'react-hot-toast';

export default function ProductCard({ product, showSubcategory }) {
    const {
        addToCart,
        getCart,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        wishlistItems,
    } = useContext(cartContext);

    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    function getOut() {
        localStorage.removeItem('token');
        navigate('/');
    }

    async function addProductToCart(productId) {
        const success = await addToCart(productId);
        if (success) {
            toast.success('Product added to cart!', {
                duration: 2000,
                position: 'top-center',
            });
        } else {
            toast.error('Failed to add product to cart', { duration: 2000 });
        }
    }

    function checkFavorite() {
        const isFav = wishlistItems.some(item => item._id === product._id);
        setIsFavorite(isFav);
    }

    async function deleteProductFromWishList(productId) {
        const success = await removeFromWishlist(productId);
        if (success) {
            setIsFavorite(false);
            toast.success('Item removed from wishlist');
        } else {
            toast.error('Failed to remove item from wishlist');
        }
    }

    async function addProductToWishList(productId) {
        const success = await addToWishlist(productId);
        if (success) {
            setIsFavorite(true);
            toast.success('Item added to wishlist');
        } else {
            toast.error('Failed to add item to wishlist');
        }
    }

    useEffect(() => {
        checkFavorite();
    }, [wishlistItems]);

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-full xl:w-full p-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <Link to={`/productDetails/${product._id}/${product.category.name}`}>
                    <img className="w-full h-48 object-cover" src={product.imageCover} alt={product.title} />
                </Link>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <div className="text-sm text-gray-500 font-medium">
                                {showSubcategory ? product.subcategory[0]?.name : product.category.name}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {product.title.split(' ').slice(0, 2).join(' ')}
                            </h3>
                        </div>
                        <i
                            className={`fa-solid fa-heart text-lg cursor-pointer transition-colors ${
                                isFavorite ? 'text-red-500' : 'text-gray-300'
                            }`}
                            onClick={() => {
                                isFavorite
                                    ? deleteProductFromWishList(product._id)
                                    : addProductToWishList(product._id);
                            }}
                        ></i>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-medium">{product.price} EGP</span>
                        <span className="flex items-center">
                            <i className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                            <span className="text-gray-600 font-medium text-sm">
                                {product.ratingsAverage}
                            </span>
                        </span>
                    </div>
                    <button
                        onClick={() => addProductToCart(product._id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        <i className="fa-solid fa-cart-plus mr-2"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
