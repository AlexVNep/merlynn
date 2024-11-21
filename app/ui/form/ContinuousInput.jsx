"use client";
export default function ContInput({
  value,
  label,
  name,
  type,
  onChange,
  min,
  max,
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
      <input
        className="text-black rounded-md border border-gray-200"
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        min={min}
        max={max}
      />
    </>
  );
}
