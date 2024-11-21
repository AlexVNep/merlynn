"use client";
export default function NomInput({
  value,
  label,
  option,
  name,
  onChange,
  htmlFor,
}) {
  return (
    <>
      {label && (
        <label
          className="mb-2 mt-2 block text-sm font-medium"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      <select
        className="text-black peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
        name={name}
        value={value}
        onChange={onChange}
      >
        {option.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
