"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart, updateCartQuantity } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [maxMsg, setMaxMsg] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    useEffect(() => {
        if (quantity === 3) {
            setMaxMsg(true);
            const timer = setTimeout(() => setMaxMsg(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [quantity]);

    return productData ? (<>
        <Navbar />
        {/* Floating Chatbot Button */}
        <button
            className="fixed right-6 bottom-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg p-4 text-lg font-bold transition"
            onClick={() => setChatOpen(true)}
            aria-label="Open chatbot"
            style={{ boxShadow: '0 4px 24px rgba(80,0,120,0.15)' }}
        >
            💬
        </button>
        {/* Chatbot Drawer */}
        {chatOpen && (
            <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slideIn">
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-lg text-purple-700">Carty Chatbot</span>
                    <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-4 text-gray-700">Popular products you might like:</div>
                    <div className="grid grid-cols-1 gap-4">
                        {products.slice(0, 4).map((product, idx) => (
                            <ProductCard key={idx} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        )}
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col relative">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    {/* Quantity Counter */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-medium text-gray-700">Quantity:</span>
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setQuantity(q => Math.min(3, q + 1))}
                            disabled={quantity === 3}
                        >
                            +
                        </button>
                    </div>
                    {maxMsg && (
                        <div className="absolute left-0 top-20 w-full flex justify-center z-10">
                            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded shadow-lg text-base font-semibold animate-pulse">
                                Max amount is 3
                            </div>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button
                            onClick={() => updateCartQuantity(productData._id, quantity)}
                            className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => { updateCartQuantity(productData._id, quantity); router.push('/cart') }}
                            className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;