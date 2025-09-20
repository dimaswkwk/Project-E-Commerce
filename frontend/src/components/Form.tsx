"use client"
import {useState} from "react";
import { FormProps } from "../types/types";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Form ({action}: {action: (data : FormProps) => void }) {
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
        action(form)
    }
    return (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-3 bg-white border-1 rounded-md shadow-md">
            <h1 className="text-center border-b">Form add product</h1>
            <div>
                <Label htmlFor="Nama Product">Nama Product</Label>
            <Input name="name" placeholder="Nama mu disini" value={form.name} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="Harga Product">Harga Product</Label>
            <Input name="price" placeholder="harga mu disini" value={form.price} onChange={handleChange} />
             </div>
            <div>
                <Label htmlFor="Stock Product">Stock Product</Label>
            <Input name="stock" placeholder="rp" value={form.stock} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="Gambar Product">Gambar Product</Label>
            <Input type="file" accept="image/*"   onChange={handleFileChange} />
            </div>
            <div>
                <Label htmlFor="Deskripsi Product">Deskripsi Product</Label>
            <Input name="description" placeholder=" description "  value={form.description} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="Nama Toko">Nama Toko</Label>
            <Input name="store_name" placeholder=" store name" className="mb-2" value={form.store_name} onChange={handleChange} />
            </div>
                <button type="submit" className="bg-blue-600 text-gray-200 p-2 rounded-lg" >Submit</button>
        </form>
    );
};