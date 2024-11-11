export default async function ContInput({
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
