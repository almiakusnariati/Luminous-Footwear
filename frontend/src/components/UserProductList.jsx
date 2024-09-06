import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import video from "../assets/videoo.mp4";

const UserProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePriceRange = (event) => {
        setPriceRange(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriceRange = priceRange === 'low' ? product.price < 1500000 :
                                  priceRange === 'medium' ? product.price >= 1500000 && product.price <= 5500000 :
                                  priceRange === 'high' ? product.price > 5500000 : true;
        return matchesSearch && matchesPriceRange;
    });

    const handleViewDetails = (id) => {
        navigate(`/user/product-details/${id}`);
    };

    return (
        <>
            <Navbar />
            {/* Pencarian dan Filter */}
            <div className="flex justify-between items-center my-4 px-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 rounded w-1 sm:w-1/2"
                />
                <select
                    onChange={handlePriceRange}
                    className="p-2 border border-gray-300 rounded w-1/2 sm:w-1/6"
                >
                    <option value="">All Price</option>
                    <option value="low">Di Bawah Rp 1.500.000</option>
                    <option value="medium">Rp 1.500.000 - Rp 5.500.000</option>
                    <option value="high">Di Atas Rp 5.500.000</option>
                </select>
            </div>

            {/* Video Section */}
            <div className="relative flex justify-center items-center bg-white py-8">
                <div className="relative w-4/5 lg:w-3/5 h-[350px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    ></video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 flex items-center justify-center">
                        <h1 className="text-white text-3xl lg:text-4xl font-bold px-4 text-center">
                        </h1>
                    </div>
                </div>
            </div>

            {/* Daftar Produk */}
            <div className="bg-gold min-h-screen p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="border border-gray-200 p-4 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
                            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                            <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                            <p className="font-semibold text-lg mb-2">Rp {product.price.toLocaleString()}</p>
                            <button
                                onClick={() => handleViewDetails(product.id)}
                                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                See Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default UserProductList;
