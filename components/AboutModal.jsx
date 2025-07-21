import React from "react";

export default function AboutModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">About This Application</h2>
        <div className="prose max-w-none text-gray-800">
          <p><strong>Carty</strong> is a modern e-commerce web application built with <strong>Next.js</strong> (App Router), <strong>React</strong>, and <strong>Tailwind CSS</strong> for a fast, responsive, and beautiful user experience.</p>
          <ul>
            <li>Authentication: Clerk</li>
            <li>State Management: React Context API</li>
            <li>Styling: Tailwind CSS</li>
            <li>Image Optimization: next/image</li>
            <li>Database: (Demo uses static data, can be extended to MongoDB/Postgres)</li>
            <li>APIs: Next.js API routes</li>
            <li>Docker support for deployment</li>
            <li>Other tools: react-hot-toast, cloud image hosting, and more</li>
          </ul>
          <p>Features include product browsing, cart, checkout, seller dashboard, order management, and a smart chatbot for product suggestions.</p>
          <p className="mt-6 text-right font-semibold">-&gt; sleman awiwi</p>
        </div>
      </div>
    </div>
  );
} 