
export const MainButton = ({ type, children }) => {
    return (
        <button
            type={type}
            className="bg-gray-800 hover:bg-gray-900 rounded-md w-1/3 mt-4 px-10 py-3 text-white font-semibold hover:font-bold scale-100 hover:scale-105 transition duration-200"
        >
            {children}
        </button>
    );
}
