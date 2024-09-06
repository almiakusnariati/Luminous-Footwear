// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import UserProductList from './components/UserProductList';
import UserProductDetails from './components/UserProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import ProductForm from './components/ProductForm';
import About from './components/About';

const App = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/user/products" element={<UserProductList />} />

                        <Route path="/about" element={<About />} />

                        <Route path="/admin/products" element={<ProductList />} />
                        
                        <Route path="/user/product-details/:id" element={<UserProductDetails />} />
                        
                        <Route path="/user/products/login" element={<Login />} />
                        <Route path="/user/products/register" element={<Register />} />
                        
                        <Route path="/add-product" element={<ProductForm />} />
                        <Route path="/edit-product/:id" element={<ProductForm />} />
                        
                        <Route path="*" element={<UserProductList />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
