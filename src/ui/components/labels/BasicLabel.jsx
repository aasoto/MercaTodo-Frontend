
export const BasicLabel = ({ htmlFor, children }) => {
    return (
        <label htmlFor={htmlFor} className="text-gray-600 text-sm font-medium">
            {children}
        </label>
    );
}
