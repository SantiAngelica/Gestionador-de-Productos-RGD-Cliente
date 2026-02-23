import React from 'react'
import { useState } from 'react'
import './NewProductForm.css'
import Desplegable from './Desplegable'
import AddingInput from './AddingInput'
import toast, { Toaster } from 'react-hot-toast'
import { API_BASE_URL } from '../../config/api'
import { useProducts } from '../../context/ProductContext'

function NewProductForm() {
  const { handleAddProduct } = useProducts()
  const [formData, setFormData] = useState({
    marca: '',
    tvModel: '',
    productType: '',
    productNumber: '',
    location: '',
    state: true,
    quantity: 1,
    detail: '',
    equivalentModels: []

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.productType === "") toast.error("Por favor seleccione un tipo de producto")
    if (formData.state === "") toast.error("Por favor seleccione un estado para el producto")
    if (formData.productType === "" || formData.state === "") return

    const createProduct = async () => {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          state: formData.state === 'funcional'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || JSON.stringify(data))
      }

      handleAddProduct(data)

      return data
    }

    try {
      await toast.promise(
        createProduct(),
        {
          loading: 'Guardando producto...',
          success: 'Producto agregado con éxito',
          error: (err) => err.message || 'Error al agregar el producto'
        }
      )

      setFormData({
        marca: '',
        tvModel: '',
        productType: '',
        productNumber: '',
        location: '',
        state: '',
        quantity: 1,
        detail: '',
        equivalentModels: []
      })

    } catch (error) {
      // opcional: por si necesitás lógica extra
      console.error(error)
    }
  }


  const handleAddEquivalentModel = (newModel) => {
    if (formData.equivalentModels.some(m => m === newModel)) {
      toast.error("El modelo ya fue agregado")
      return
    }
    setFormData({
      ...formData,
      equivalentModels: [...formData.equivalentModels, newModel]
    })
    console.log(formData)
  }

  const handleDeleteEquivalentModel = (model) => {
    setFormData({
      ...formData,
      equivalentModels: formData.equivalentModels.filter(m => m !== model)
    })
  }

  return (
    <div className="container form-container my-4">
      <h2>Agregar nuevo producto</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <Desplegable
          label="Marca"
          name="marca"
          opciones={[
            'Samsung',
            'LG',
            'Sony',
            'Philips',
            'Panasonic',
            'TCL',
            'Hisense',
            'Sharp',
            'Noblex',
            'Hitachi'
          ]}

          value={formData.marca}
          onChange={handleChange}
        />

        <label>
          Modelo TV
          <input
            type="text"
            name="tvModel"
            value={formData.tvModel}
            onChange={handleChange}
            placeholder='Ej: UN40J5500, 43J6560'
            required
          />
        </label>

        <Desplegable
          label="Tipo"
          name="productType"
          opciones={['Main', 'Fuente', 'Tcon', 'Bluetooth', 'Receptor remoto', 'WiFi']}
          value={formData.productType}
          onChange={handleChange}
        />

        <label>
          Número de producto
          <input
            type="text"
            name="productNumber"
            value={formData.productNumber}
            onChange={handleChange}
            placeholder='Ej: RSAG7.820.7404'
            required
          />
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min={1}
            onChange={handleChange}
            placeholder='Ej: 10'
            required
          />
        </label>

        <label>
          Ubicación
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder='Ej: Caja 1, Estante C'
            required
          />
        </label>

        <label>
          Estado
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="funcional">Funcional</option>
            <option value="defectuoso">Defectuoso</option>
          </select>
        </label>

        <label>
          Detalle
          <input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            maxLength={50}
            placeholder='Maximo 50 caracteres'
          />
        </label>



        <AddingInput onAddModel={handleAddEquivalentModel} />
        <ul className="equivalent-models-container">
          {formData.equivalentModels.map((model, index) => (
            <li key={index}>
              <button type='button' className='p-2 py-1' onClick={() => handleDeleteEquivalentModel(model)}>
                {model}
                <span className='ms-3'>✕</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="submit">Guardar producto</button>
      </form>
      <Toaster position="bottom-right" reverseOrder={false}
        toastOptions={{
          className: 'custom-toast'
        }} />
    </div>
  )
}

export default NewProductForm