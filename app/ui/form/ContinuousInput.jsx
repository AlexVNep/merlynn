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
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input
        className="text-black"
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
