export default async function ContInput({
  value,
  label,
  name,
  type,
  onChange,
  min,
  max,
}) {
  return (
    <>
      {label && <label htmlFor="input-field">{label}</label>}
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
