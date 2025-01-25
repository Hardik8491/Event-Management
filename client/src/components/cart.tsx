import { ShoppingCart } from "lucide-react";
import React from "react";

const Cart = () => {
    return (
        <div className='flex item-center justify-center mx-4 pr-4 relative'>
            <ShoppingCart size={25} color='black' className='cursor-pointer' />
            <span className='bg h-4 w-4 flex items-center justify-center absolute -top-2 p-2 right-2  rounded-full  text-xs font-semibold font-Josefin'>
                0
            </span>
        </div>
    );
};

export default Cart;
