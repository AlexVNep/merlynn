"use client";
export default function NormalInput({
  value,
  label,
  name,
  type,
  onChange,
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
      />
    </>
  );
}
