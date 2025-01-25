import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  image: string;
}

interface CartState {
  items: Course[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Course>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (!existingItem) {
        // Only add the item if it doesn't already exist in the cart
        state.items.push({ ...action.payload });
        state.totalAmount += action.payload.price;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.totalAmount -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
