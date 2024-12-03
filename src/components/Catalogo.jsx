import React from 'react';
import {useState, useEffect} from "react";

const Catalogo = () => {
    const [productos, setProductos] = useState([])
    const [productosCarrito, setProductosCarrito] = useState([])

    useEffect(() => {
        fetch('/public/articulos_navideños.json')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al cargar los datos:', error));
    }, [])

    const addToShopping = (producto) => {
        setProductosCarrito([...productosCarrito,producto])
    }

    return (
        <div>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre}
                        <button onClick={() => addToShopping(producto)}>Add</button>
                    </li>
                ))}
            </ul>
            <ul>
                {productosCarrito.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Catalogo;