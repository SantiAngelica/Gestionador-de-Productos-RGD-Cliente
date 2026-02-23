import { useState } from 'react'

function Deplegable({ label, name, opciones, value, onChange }) {
  const [isOtro, setIsOtro] = useState(false)

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value

    if (selectedValue === 'otro') {
      setIsOtro(true)
      onChange({ target: { name, value: '' } })
    } else {
      setIsOtro(false)
      onChange(e)
    }
  }

  const handleOtroChange = (e) => {
    onChange(e)
  }

  return (
    <label>
      {label}
      <select name={name} value={isOtro ? 'otro' : value} onChange={handleSelectChange}>
        <option value="">Seleccionar</option>
        {opciones.map(op => (
          <option key={op} value={op}>{op}</option>
        ))}
        <option value="otro">Otro...</option>
      </select>

      {isOtro && (
        <input
          type="text"
          name={name}
          placeholder="Ingresar valor"
          value={value}
          onChange={handleOtroChange}
        />
      )}
    </label>
  )
}

export default Deplegable
