import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { API_BASE_URL } from "../config/api";


const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export function ProductProvider({ children }) {
    const [allProducts, setAllProducts] = useState([]);
    const [filters, setFilters] = useState({
        type: "",
        state: "",
        query: "",
        marca: ""
    });

    useEffect(() => {
        if (!filters.marca) {
            setAllProducts([]);
            return;
        }

        fetch(`${API_BASE_URL}/products?Marca=${filters.marca}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(console.error);
    }, [filters.marca]);

    const products = useMemo(() => {
        const { type, state, query } = filters;

        const stateValue =
            state === "activo" ? true :
                state === "inactivo" ? false :
                    null;

        let filtered = [...allProducts];

        if (type) {
            if (type === "otro") {
                filtered = filtered.filter(p =>
                    !['main', 'fuente', 'tcon', 'bluetooth', 'receptor remoto', 'wifi']
                        .includes(p.productType.toLowerCase())
                );
            } else {
                filtered = filtered.filter(p =>
                    p.productType.toLowerCase() === type.toLowerCase()
                );
            }
        }

        if (stateValue !== null) {
            filtered = filtered.filter(p => p.state === stateValue);
        }

        if (query) {
            filtered = filtered.filter(p =>
                p.tvModel.toLowerCase().includes(query.toLowerCase()) ||
                p.marca.toLowerCase().includes(query.toLowerCase()) ||
                p.productNumber.toLowerCase().includes(query.toLowerCase()) ||
                p.productType.toLowerCase().includes(query.toLowerCase()) ||
                p.location.toLowerCase().includes(query.toLowerCase()) ||
                p.equivalentModels.some(m => m.toLowerCase().includes(query.toLowerCase()))
            );
        }

        return filtered;
    }, [allProducts, filters]);

    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteProduct = (productId) => {
        setAllProducts(prev =>
            prev.filter(product => product.id !== productId)
        );
    }

    const handleAddProduct = (newProduct) => {
        setAllProducts(prev => [newProduct, ...prev]);
    };

    const handleUpdateProduct = (updatedProduct) => {
        console.log(updatedProduct)
        setAllProducts(prev =>
            prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
    };



    return (
        <ProductContext.Provider value={{
            products,
            filters,
            setFilters,
            handleChangeFilter,
            handleDeleteProduct,
            handleAddProduct,
            handleUpdateProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}
