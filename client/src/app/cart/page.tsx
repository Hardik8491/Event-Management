"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux-toolkit/store';
import { addItem, removeItem, clearCart } from '@/redux-toolkit/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from "lucide-react";
import { useCheckoutMutation } from '@/redux-toolkit/features/checkout/checkoutApi';
import { useRouter } from 'next/navigation';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: any) => state.auth);

  console.log(cart);
  const [checkout, { isLoading, isSuccess, isError }] = useCheckoutMutation();


  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const courses = cart.items.map((item:any) => ({
    id: item._id,
    price: item.price,
  }));
  const handleCheckout = async () => {
    const data = {
      items: courses,
    };


    try {
      const response = await checkout(data);
      if ('error' in response) {
        throw new Error('Checkout failed');
      }
      if (response.data && response.data.url) {
        router.push(response.data.url);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img src={`/placeholder.svg?height=100&width=100`} alt={item.title} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className='flex items-center gap-4'>
              <Button className="w-full" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button onClick={handleCheckout} className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
