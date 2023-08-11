
export const BasicInput = ({ type, name, value, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
        />
    );
}
