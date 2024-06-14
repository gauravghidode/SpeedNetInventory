import React from 'react'

const FormInput = ({ label, name, type, defaultValue, handleChange }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input type={type} placeholder="Type here" name={name} defaultValue={defaultValue} className="input input-bordered " onChange={handleChange} />
    </label>
  )
}

export default FormInput