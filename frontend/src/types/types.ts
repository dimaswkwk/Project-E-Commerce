export interface FormProps {
    name: string;
    price: number;
    stock: number;
    image?: File | null;
    onSubmit: (data: FormProps) => void;
    description: string;
    store_name: string;
}

export interface products{
    id: number;
    name: string;
    price: number;
    store_name: string;
    image?: string | null;
    slug: string;
}
export interface Product{
    id: number;
    name: string;
    price:number;
    stock:number;
    image?: string | null;
    description:string;
    store_name: string;

}
export interface usersType {
    id: number;
    nama: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}
export interface UserContextType {
    users: usersType | null;
    loading: boolean;
    setUser: (user: usersType | null) => void;
    refetchUser: () => void;
}
export interface CartItems {
    id: number;
    product_id: number;
    quantity: number;
    image?: string | null;
    name: string;
    price: number;
}
export interface LoadingCart {

    loadng: boolean;
}
export interface productCart {
    id: number;
    name: string;
    price: number;
}

