import React from 'react';

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  error,
  containerClassName = '',
  rows = 3,
  min,
  max
}) {
  const errorList = Array.isArray(error) ? error : (error ? [error] : []);

  return (
    <div className={`form-field ${containerClassName}`}>
      {label && <label className="form-label" htmlFor={id}>{label}</label>}

      {type === 'textarea' && (
        <textarea
          id={id}
          className="form-input"
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      )}

      {type === 'select' && (
        <select id={id} className="form-input" value={value ?? ''} onChange={onChange}>
          {placeholder && <option value="">{placeholder}</option>}
          {(options || []).map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {type !== 'textarea' && type !== 'select' && (
        <input
          id={id}
          type={type}
          className="form-input"
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      )}

      {errorList.map((err, idx) => (
        <div key={idx} className="form-helper-error">{err}</div>
      ))}
    </div>
  );
}

export default FormField;
