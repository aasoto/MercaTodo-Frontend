
export const RoundedInfo = ({ children }) => {
    return (
        <div className="px-6 py-2 border border-gray-600 dark:border-gray-500 rounded-full w-max mx-auto shadow-none hover:shadow scale-100 hover:scale-105 transition duration-200 cursor-pointer">
            <h5 className="text-gray-600 dark:text-gray-500 text-xl font-light capitalize">
                {children}
            </h5>
        </div>
    )
}
