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
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      <input
        className="peer text-black block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
