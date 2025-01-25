import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

import { CircleUser, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux-toolkit/store'


const CartToggle = () => {
  
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full relative">
          <Link href="/cart">
     
            <ShoppingCart className="h-5 w-5" />

          </Link>
          {cartItemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-primary text-black dark:text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
        >
          {cartItemCount}
        </span>
      )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent align="end" className='z-[999]'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent> */}
    </DropdownMenu>

  )
}

export default CartToggle

