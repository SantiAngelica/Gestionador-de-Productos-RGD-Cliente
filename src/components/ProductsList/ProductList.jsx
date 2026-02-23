import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import './ProductList.css'
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { buscarModelo } from "../../Helpers/GoogleSearch.js"
import { CiSearch } from "react-icons/ci";
import FilterBar from '../FilterBar/FilterBar.jsx';
import Highlighter from "react-highlight-words";
import { Tooltip } from 'react-tooltip'
import { useProducts } from '../../context/ProductContext.jsx';






function ProductList() {
  const { products, filters, handleChangeFilter, handleDeleteProduct } = useProducts();

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteProd = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
              }
            })
            if (!response.ok) {
              throw new Error('Error deleting product')
            }
            handleDeleteProduct(productId);
          } catch (error) {
            toast.error(`Error al eliminar el producto`)
          }
        }
        await toast.promise(
          deleteProd(),
          {
            loading: 'Eliminando producto...',
            success: 'Producto eliminado con éxito',
            error: 'Error al eliminar el producto'
          }
        )
      }
    });
  }
  return (
    <div className='mb-4 card p-0 table-container'>

      <FilterBar handleChangeFilter={handleChangeFilter} filters={filters} />
      <div className="tabla-scroll">
        <table className='tabla'>
          {products.length > 0 && (
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo TV</th>
                <th>Tipo</th>
                <th>Numero de producto</th>
                <th>Ubicacion</th>
                <th>Estado</th>
                <th>Modelos equivalentes</th>
                <th></th>
                <th></th>
              </tr>
            </thead>)}
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                data-tooltip-id="product-tooltip"
                data-tooltip-place="top"
                data-tooltip-content={`
${product.detail || 'Sin Detalle'}
Cantidad: ${product.quantity}
`}
              >

                <td data-label="ID">{product.id}</td>
                <td data-label="Marca">{product.marca}</td>
                <td data-label="Modelo TV">
                  {filters.query === "" ? product.tvModel :
                    <Highlighter
                      highlightClassName="highlight"
                      searchWords={[filters.query]}
                      autoEscape={true}
                      textToHighlight={product.tvModel}
                    />
                  }
                </td>
                <td data-label="Tipo">{filters.query === "" || filters.type !== 'otro' ? product.productType :
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[filters.query]}
                    autoEscape={true}
                    textToHighlight={product.productType}
                  />
                }</td>
                <td data-label="Numero de producto">
                  {filters.query === "" ? product.productNumber :
                    <Highlighter
                      highlightClassName="highlight"
                      searchWords={[filters.query]}
                      autoEscape={true}
                      textToHighlight={product.productNumber}
                    />
                  }
                  <CiSearch className='mx-2 search-img hvr-float' onClick={() => buscarModelo(product.productNumber)} />

                </td>
                <td data-label="Ubicacion">{filters.query === "" ? product.location :
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[filters.query]}
                    autoEscape={true}
                    textToHighlight={product.location}
                  />
                }
                </td>
                <td data-label="Estado" className={product.state ? "estado-activo" : "estado-inactivo"}>
                  {product.state ? "Activo" : "Inactivo"}
                </td>
                <td data-label="Modelos equivalentes">
                  {filters.query === "" ? product.equivalentModels.join(" - ") :
                    <Highlighter
                      highlightClassName="highlight"
                      searchWords={[filters.query]}
                      autoEscape={true}
                      textToHighlight={product.equivalentModels.join(" - ")}
                    />
                  }
                </td>
                <td data-label="Acciones" className="actions-cell">
                  <div className="actions-container">
                    <span
                      className="delete-button hvr-rotate"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrashCan />
                    </span>

                    <Link
                      to={`/home/${product.id}`}
                      className="edit-button"
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
        <Tooltip
          id="product-tooltip"
          style={{
            backgroundColor: "#0f172a",
            color: "#e5e7eb",
            borderRadius: "8px",
            whiteSpace: "pre-line",
            zIndex: 1000
          }}
        />
      </div>
      <Toaster position="bottom-right" reverseOrder={false}
        toastOptions={{
          className: 'custom-toast',
        }} />
    </div>
  )
}

export default ProductList