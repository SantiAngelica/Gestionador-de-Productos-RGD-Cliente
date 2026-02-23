import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api.js'
import AddingInput from '../NewProductForm/AddingInput.jsx'
import toast, { Toaster } from 'react-hot-toast'
import UpdateDesplegable from './UpdateDesplegable.jsx'
import { useProducts } from '../../context/ProductContext.jsx'


function ProductItem() {

  const { handleUpdateProduct } = useProducts()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const { equivalentModelsJson, id, ...clean } = data
        setProduct(clean)
      })
      .catch(error => console.error('Error fetching product:', error))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleAddEquivalentModel = (newModel) => {
    if (product.equivalentModels.some(m => m === newModel)) {
      toast.error("El modelo ya fue agregado")
      return
    }
    setProduct({
      ...product,
      equivalentModels: [...product.equivalentModels, newModel]
    })
  }
  const handleDeleteEquivalentModel = (model) => {
    setProduct({
      ...product,
      equivalentModels: product.equivalentModels.filter(m => m !== model)
    })
  }

  if (!product) return <div>Loading...</div>

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (product.productType === "") toast.error("Por favor seleccione un tipo de producto")
    if (product.state === "") toast.error("Por favor seleccione un estado para el producto")
    if (product.productType === "" || product.state === "") return

    console.log(product)

    const updateProduct = async () => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...product,
          state: product.state === 'activo' || product.state === true
        })
      })

      if (!response.ok) {
        throw new Error("Error updating product")
      }

      handleUpdateProduct({
        ...product,
        id: Number(id),
        state: product.state === 'activo' || product.state === true
      })
      return
    }

    try {
      await toast.promise(
        updateProduct(),
        {
          loading: 'Editando producto...',
          success: 'Producto editado con éxito',
          error: (err) => err.message || 'Error al editar el producto'
        }
      )
      setTimeout(() => { navigate("/home") }, 1000)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container form-container my-4">
      <h2>Editar producto</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <label>
          ID
          <input
            type="text"
            name="id"
            value={id}
            disabled
            className="input-disabled"
          />
        </label>


        <UpdateDesplegable
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

          value={product.marca}
          onChange={handleChange}
        />

        <label>
          Modelo TV
          <input
            type="text"
            name="tvModel"
            value={product.tvModel}
            onChange={handleChange}
            placeholder='Ej: UN40J5500, 43J6560'
            required
          />
        </label>

        <UpdateDesplegable
          label="Tipo"
          name="productType"
          opciones={['Main', 'Fuente', 'Tcon', 'Bluetooth', 'Receptor remoto', 'WiFi']}
          value={product.productType}
          onChange={handleChange}
        />

        <label>
          Número de producto
          <input
            type="text"
            name="productNumber"
            value={product.productNumber}
            onChange={handleChange}
            placeholder='Ej: RSAG7.820.7404'
            required
          />
        </label>

        <label>
          Ubicación
          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            placeholder='Ej: Caja 1, Estante C'
            required
          />
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            min={1}
            onChange={handleChange}
            placeholder='Ej: 10'
            required
          />
        </label>

        <label>
          Estado
          <select
            name="state"
            value={product.state}
            onChange={handleChange}
            required
          >
            <option value={product.state ? "activo" : "inactivo"}>{product.state ? "Activo" : "Inactivo"}</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </label>

        <label>
          Detalle
          <input
            type="text"
            name="detail"
            value={product.detail}
            onChange={handleChange}
            maxLength={50}
            placeholder='Maximo 50 caracteres'
          />
        </label>

        <AddingInput onAddModel={handleAddEquivalentModel} />
        <ul className="equivalent-models-container">
          {product.equivalentModels.map((model, index) => (
            <li key={index}>
              <button type='button' className='p-2 py-1' onClick={() => handleDeleteEquivalentModel(model)}>
                {model}
                <span className='ms-3'>✕</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="submit">Guardar</button>
      </form>
      <Toaster position="bottom-right" reverseOrder={false}
        toastOptions={{
          className: 'custom-toast'
        }} />
    </div>
  )
}

export default ProductItem