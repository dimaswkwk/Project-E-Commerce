"use client"
import {useState} from "react";
import { FormProps } from "../types/types";

export default function Form ({onSubmit}: {onSubmit: (data : FormProps) => void }) {
    //form itu nilainya dan setform itu untuk mengupdate isi dari form
    const [form, setForm] = useState<FormProps>({ //use state adalah fungsi yang menyimpan data dinamis yang berubah seiring waktu ketika user berinteraksi, singkatnya merubah data
    name:"",
    price:0,
    stock:0,
    image:null,
    description:"",
    store_name:"",
    onSubmit: () => {}
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
          ...prev,
           [name]: name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            image: e.target.files?.[0] || null,
        }))
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form)
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
            <input name="name" placeholder="Nama mu disini" value={form.name} onChange={handleChange} />
            <input name="price" placeholder="harga mu disini" value={form.price} onChange={handleChange} />
            <input name="stock" placeholder="stocknya berapa" value={form.stock} onChange={handleChange} />
            <input type="file" accept="image/*"  onChange={handleFileChange} />
            <input name="description" placeholder=" description " value={form.description} onChange={handleChange} />
            <input name="store_name" placeholder=" store name" value={form.store_name} onChange={handleChange} />
            <button type="submit" className="bg-blue-600 text-gray-200 p-2 rounded-lg" >Submit</button>
        </form>
    );
};