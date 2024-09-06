import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails(id);
    }, [id]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleBackButtonClick = () => {
        navigate('/user/products'); // Arahkan ke halaman utama produk
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex font-sans max-w-4xl mx-auto p-6">
            <div className="flex-none w-56 relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
            </div>
            <form className="flex-auto p-6">
                <div className="flex flex-wrap mb-6">
                    <h1 className="flex-auto font-medium text-slate-900 text-xl">
                        {product.name}
                    </h1>
                    <div className="w-full flex-none mt-2 text-3xl font-bold text-gray-600">
                        Rp {product.price}
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        In stock
                    </div>
                </div>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                    <div className="space-x-2 flex text-sm font-bold">
                        {['36', '37', '38', '39', '40'].map(size => (
                            <label key={size}>
                                <input className="sr-only peer" name="size" type="radio" value={size} />
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 peer-checked:bg-gray-600 peer-checked:text-white">
                                    {size.toUpperCase()}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-4 mb-5 text-sm font-medium">
                    <div className="flex-auto flex space-x-4">
                        <button
                            className="h-10 px-6 font-semibold rounded-full bg-gray-800 text-white"
                            type="button"
                        >
                            Buy now
                        </button>
                        <button
                            className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
                            type="button"
                        >
                            Add to bag
                        </button>
                    </div>
                    <button
                        className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-red-600 bg-blue-50"
                        type="button"
                        aria-label="Like"
                    >
                        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-slate-500">
                    Free shipping on all continental US orders.
                </p>
                <button
                    onClick={handleBackButtonClick}
                    className="bg-gray-600 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600 transition duration-300"
                >
                    Kembali
                </button>
            </form>
        </div>
    );
};

export default UserProductDetails;
