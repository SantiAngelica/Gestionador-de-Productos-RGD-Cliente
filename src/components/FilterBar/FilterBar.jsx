import React, { useState } from 'react'
import './FilterBar.css'
import { IoSearch } from "react-icons/io5";

function FilterBar({ handleChangeFilter, filters }) {

    const { type, state, query, marca } = filters




    return (
        <div className='filter-bar'>
            <div className='filters-group'>
                <div className="marcas-filter">
                    <select name="marca" onChange={handleChangeFilter}>
                        <option value="">Marca</option>
                        <option value="samsung">Samsung</option>
                        <option value="lg">LG</option>
                        <option value="sony">Sony</option>
                        <option value="philips">Philips</option>
                        <option value="panasonic">Panasonic</option>
                        <option value="tcl">TCL</option>
                        <option value="hisense">Hisense</option>
                        <option value="sharp">Sharp</option>
                        <option value="noblex">Noblex</option>
                        <option value="hitachi">Hitachi</option>
                        <option value="otro">Otro...</option>
                    </select>
                </div>
                <div className="types-filter">
                    <select name="type" onChange={handleChangeFilter}>
                        <option value="">Todo</option>
                        <option value="main">Main</option>
                        <option value="fuente">Fuente</option>
                        <option value="tcon">Tcon</option>
                        <option value="bluetooth">Bluetooth</option>
                        <option value="receptor remoto">Receptor remoto</option>
                        <option value="wifi">WiFi</option>
                        <option value="otro">Otro...</option>
                    </select>

                </div>
                <div className="state-filter d-flex align-items-center">
                    <label className="cyberpunk-checkbox-label">
                        <input
                            type="checkbox"
                            className="cyberpunk-checkbox"
                            name="state"
                            value="activo"
                            checked={state === "activo"}
                            onChange={(e) =>
                                handleChangeFilter({
                                    target: {
                                        name: "state",
                                        value: e.target.checked ? "activo" : ""
                                    }
                                })
                            }
                        />
                        Activo
                    </label>

                    <label className="cyberpunk-checkbox-label ms-3">
                        <input
                            type="checkbox"
                            className="cyberpunk-checkbox"
                            name="state"
                            value="inactivo"
                            checked={state === "inactivo"}
                            onChange={(e) =>
                                handleChangeFilter({
                                    target: {
                                        name: "state",
                                        value: e.target.checked ? "inactivo" : ""
                                    }
                                })
                            }
                        />
                        Inactivo
                    </label>
                </div>
            </div>
            <div className="InputContainer">
                <input
                    placeholder="Search"
                    id="input"
                    className="input"
                    name="query"
                    type="text"
                    value={query}
                    onChange={handleChangeFilter}
                />


                <IoSearch className='me-2' />

            </div>
        </div >
    )
}

export default FilterBar