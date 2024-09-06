import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import cookie from "js-cookie";

const ProductForm = () => {
    const tkn = cookie.get('token')
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${id}`, config);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/products/${id}`,product,{
                    withCredentials:'true',
                    header:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${tkn}`
                    }
            });
            } else {
                await axios.post('http://localhost:8080/api/products',product,{
                    withCredentials:'true',
                    header:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${tkn}`
                    }
                });
            }
            navigate('/admin/products'); 
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    
    const handleCancel = () => {
        navigate('/admin/products'); 
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Produk' : 'Tambah Produk'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nama:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Deskripsi:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Harga:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Kategori:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Stok:</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">URL Gambar:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                    >
                       cancelled
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {id ? 'Update' : 'Tambah'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
