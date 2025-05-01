export default function Modal({ isOpen, onClose }) {
    if (!isOpen) return null; // Ensure modal only renders when open
  
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose} // Close modal when clicking outside
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
  
          {/* Modal Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            WebAssembly Performance Summary
          </h2>
  
          {/* Consensus Opinion */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Consensus Opinion</h3>
            <p className="text-gray-700">
              WebAssembly is a powerful tool for specific use cases but isn't a replacement for JavaScript in most web applications.
            </p>
          </div>
  
          {/* Key Takeaways */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Takeaways</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>WebAssembly is not always faster than optimized JavaScript</li>
              <li>Memory transfer overhead can impact performance gains</li>
              <li>Best suited for compute-intensive tasks like image processing, gaming</li>
              <li>Tooling and debugging support has significantly improved</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  