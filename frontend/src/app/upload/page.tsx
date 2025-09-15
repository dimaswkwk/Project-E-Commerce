'use client'
import Form from "../../components/Form";
import {FormProps} from "../../types/types"

function FormProduct() {
    const handleSubmit = async (data: FormProps) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock))
        if (data.image) formData.append("image", data.image);
        formData.append("description", String(data.description));
        formData.append("store_name", String(data.store_name))
        console.log('sending data', formData)
    await fetch("http://localhost:5000/api/addproduct", {
        method: "POST",
        body: formData,
    });
}
    return (
    <div>
        <h1 className="font-bold">form submit produk khusus admin</h1>
        <Form action={handleSubmit}/>
    </div>
    )
}

export default FormProduct;