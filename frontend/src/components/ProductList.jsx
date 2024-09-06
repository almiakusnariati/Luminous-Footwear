import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();
    const token = Cookie.get("token");
    console.log(token);

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

    const confirmDelete = (id) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${productToDelete}`,
                {
                    withCredentials: 'true',
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
            }
        );
            setShowModal(false);
            setProductToDelete(null);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <button
                className="bg-blue-800 text-white px-4 py-2 rounded mb-4"
                onClick={() => navigate('/add-product')}
            >
                add product
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-md rounded p-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-green-800 font-bold">Rp {product.price}</p>
                        <p className="text-gray-500">stok: {product.stock}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                                onClick={() => handleEdit(product.id)}
                            >
                                put
                            </button>
                            <button
                                className="bg-red-800 text-white px-2 py-1 rounded"
                                onClick={() => confirmDelete(product.id)}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to remove this product?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-800 text-white px-4 py-2 rounded mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                cancelled
                            </button>
                            <button
                                className="bg-red-800 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
