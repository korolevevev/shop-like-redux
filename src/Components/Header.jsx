import React from "react";

export const Header = () => {
    return (
        <div className='container-fluid d-flex flex-row text-white px-5 py-3 bg-dark align-items-center position-relative'>
            <img src="/cart.png" alt="logo" width='30' height='30' className='me-3'/>
            <div className='d-flex flex-row position-relative'>
                <h2>Instagram Shop</h2>
            </div>
        </div>
    )
}