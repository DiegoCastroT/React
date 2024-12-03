import React from 'react';
import {useState, useEffect} from "react";
import '../App.css'; // Ajusta la ruta según la estructura del proyecto

const Catalogo = () => {
    const [productos, setProductos] = useState([])
    const [productosCarrito, setProductosCarrito] = useState([])
    const [isShowing, setIsShowing] = useState(false)

    useEffect(() => {
        fetch('/public/articulos_navideños.json')
            .then(res => res.json())
            .then(data => setProductos(data))
    }, [])

    const addToShopping = (producto) => {
        setProductosCarrito([...productosCarrito, producto])
    }

    const toggleCarrito = () => {
        setIsShowing(!isShowing);
    };

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
            <button onClick={toggleCarrito}>
                {isShowing ? 'Ocultar Carrito' : 'Mostrar Carrito'}
            </button>
            <ul>
                {isShowing && (
                    <ul>
                        {productosCarrito.map((producto) => (
                            <li key={producto.id}>
                                {producto.nombre}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    )
}

export default Catalogo;