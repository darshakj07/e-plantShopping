import React, { useState, useEffect } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        const added = {};
        cartItems.forEach((item) => {
            added[item.name] = true;
        });
        setAddedToCart(added);
    }, [cartItems]);

    const plantsArray = [
        {
            category: 'Air Purifying Plants',
            plants: [
                {
                    name: 'Snake Plant',
                    image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
                    description: 'Produces oxygen at night, improving air quality.',
                    cost: '$15',
                },
                {
                    name: 'Spider Plant',
                    image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
                    description: 'Filters formaldehyde and xylene from the air.',
                    cost: '$12',
                },
                {
                    name: 'Peace Lily',
                    image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
                    description: 'Removes mold spores and purifies the air.',
                    cost: '$18',
                },
                {
                    name: 'Boston Fern',
                    image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
                    description: 'Adds humidity to the air and removes toxins.',
                    cost: '$20',
                },
                {
                    name: 'Rubber Plant',
                    image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
                    description: 'Easy to care for and effective at removing toxins.',
                    cost: '$17',
                },
                {
                    name: 'Aloe Vera',
                    image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
                    description: 'Purifies the air and has healing properties for skin.',
                    cost: '$14',
                },
            ],
        },
        {
            category: 'Aromatic Fragrant Plants',
            plants: [
                {
                    name: 'Lavender',
                    image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    description: 'Calming scent, used in aromatherapy.',
                    cost: '$20',
                },
                {
                    name: 'Jasmine',
                    image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    description: 'Sweet fragrance, promotes relaxation.',
                    cost: '$18',
                },
                {
                    name: 'Rosemary',
                    image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
                    description: 'Invigorating scent, often used in cooking.',
                    cost: '$15',
                },
                {
                    name: 'Mint',
                    image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg',
                    description: 'Refreshing aroma, used in teas and cooking.',
                    cost: '$12',
                },
                {
                    name: 'Lemon Balm',
                    image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg',
                    description: 'Citrusy scent, relieves stress and promotes sleep.',
                    cost: '$14',
                },
                {
                    name: 'Hyacinth',
                    image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg',
                    description: 'A beautiful flowering plant known for its fragrance.',
                    cost: '$22',
                },
            ],
        },
        {
            category: 'Insect Repellent Plants',
            plants: [
                {
                    name: 'Oregano',
                    image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg',
                    description: 'Contains compounds that can deter certain insects.',
                    cost: '$10',
                },
                {
                    name: 'Marigold',
                    image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg',
                    description: 'Natural insect repellent, also adds color to the garden.',
                    cost: '$8',
                },
                {
                    name: 'Geraniums',
                    image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg',
                    description: 'Known for insect-repelling properties and a pleasant scent.',
                    cost: '$20',
                },
                {
                    name: 'Basil',
                    image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg',
                    description: 'Repels flies and mosquitoes, also used in cooking.',
                    cost: '$9',
                },
                {
                    name: 'Catnip',
                    image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg',
                    description: 'Repels mosquitoes and attracts cats.',
                    cost: '$13',
                },
                {
                    name: 'Chamomile',
                    image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg',
                    description: 'Soothes anxiety and promotes restful sleep.',
                    cost: '$15',
                },
            ],
        },
    ];

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div className="product-list-page">
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt="Paradise Nursery logo"
                        />
                        <div className="tag_home_link">
                            <a href="#" onClick={handleHomeClick} className="home-link">
                                <h3>Paradise Nursery</h3>
                                <span>Where Green Meets Serenity</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="nav-links">
                    <a href="#" onClick={handlePlantsClick}>Plants</a>
                    <a href="#" onClick={handleCartClick} className="cart-link" aria-label="View cart">
                        <span className="cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                                <path d="M7 4h-2a1 1 0 0 0 0 2h1.4l1.86 9.28a2 2 0 0 0 1.98 1.72h8.52a1 1 0 1 0 0-2h-8.52l-.3-1.5h7.82a2 2 0 0 0 1.91-1.41l1.36-5.44a1 1 0 0 0-.98-1.15h-13zm1.5 14a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                            </svg>
                            <span className="cart-count">{totalQuantity}</span>
                        </span>
                    </a>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="product-category">
                            <div className="plantname_heading">
                                <h2 className="plant_heading">{category.category}</h2>
                            </div>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img
                                            className="product-image"
                                            src={plant.image}
                                            alt={plant.name}
                                        />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-price">{plant.cost}</div>
                                        <button
                                            className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                                            disabled={!!addedToCart[plant.name]}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
