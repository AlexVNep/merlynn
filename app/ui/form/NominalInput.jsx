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
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <select
        className="text-black"
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
