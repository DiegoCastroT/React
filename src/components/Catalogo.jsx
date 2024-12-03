import React from 'react';
import {useState, useEffect} from "react";
import '../App.css';

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
        const exists = productosCarrito.find(item => item.id === producto.id)

        if (exists) {
            setProductosCarrito(productosCarrito.map((item) => {
                if (item.id === producto.id) {
                    return {...item, cantidad: item.cantidad + 1};
                }
                return item; // De lo contrario, dejamos el producto igual
            }))
        } else {
            setProductosCarrito([...productosCarrito, {...producto, cantidad: 1}]);
        }
    }

    const toggleCarrito = () => {
        setIsShowing(!isShowing);
    };

    const renderCarrito = () => {
        return (
            <>
                <button onClick={toggleCarrito}>
                    {isShowing ? 'Ocultar Carrito' : 'Mostrar Carrito'}
                </button>
                {isShowing && (
                    <div className="modal">
                        <div className="modal-content">
                            <h1>Carrito</h1>
                            <ul className="carrito">
                                {productosCarrito.map((producto) => (
                                    <li key={producto.id}>
                                        {producto.nombre}
                                        <div>
                                            {producto.cantidad}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={toggleCarrito}>
                                {isShowing ? 'Ocultar Carrito' : 'Mostrar Carrito'}
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        <h2> {producto.nombre}</h2>
                        <p>{producto.precio}</p>
                        <button onClick={() => addToShopping(producto)}>Add</button>
                    </li>
                ))}
            </ul>
            {renderCarrito()}
        </div>
    )
}

export default Catalogo;