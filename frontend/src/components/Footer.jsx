import { Facebook, Twitter, Instagram } from 'lucide-react'; 

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-2 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <p>Email: info@ourstore.com</p>
                        <p>Phone: +62 123 456 7890</p>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">Follow Us</h2>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className="text-center md:text-right">
                            &copy; {new Date().getFullYear()} Our Store. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
