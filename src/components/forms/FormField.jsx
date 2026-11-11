function FormField({ label, id, error, type = 'text', options, ...props }) {
  const errorId = `${id}-error`;

  const inputProps = {
    id,
    className: `input ${error ? 'input--error' : ''}`,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
    ...props,
  };

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">{label}</label>

      {options ? (
        <select {...inputProps}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input type={type} {...inputProps} />
      )}

      {error && <p id={errorId} className="field__error">⚠ {error}</p>}
    </div>
  );
}

export default FormField;