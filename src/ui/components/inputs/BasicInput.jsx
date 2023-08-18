
export const BasicInput = ({ type, name, id, value, onChange, required }) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
            required={required}
        />
    );
}
