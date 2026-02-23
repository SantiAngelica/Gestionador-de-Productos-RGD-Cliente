import React, { useState } from 'react'
import './NewProductForm.css'
import { CiCirclePlus } from "react-icons/ci";

function AddingInput({onAddModel}) {

    const [model, setModel] = useState("")

    const handleAddClick = () => {
        if(model.trim() === "") return;
        onAddModel(model.trim());
        setModel("");
    }

    return (
        <label>
            Modelos equivalentes
            <div className='add-container'>
                <input
                    type="text"
                    name="modelosEquivalentes"
                    placeholder="Ej: UN40J5500, 43J6560"
                    className='add-input'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                <CiCirclePlus className='add-button' onClick={handleAddClick}/>
            </div>
        </label>
    )
}

export default AddingInput