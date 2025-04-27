interface InputProps {
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error: string;
  }
  
  const Input = ({
    type,
    id,
    name,
    value,
    onChange,
    placeholder,
    error,
  }: InputProps) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {placeholder}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  };
  
  export default Input;
  