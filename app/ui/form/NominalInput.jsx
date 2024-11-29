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
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      <select
        className="peer text-black block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
