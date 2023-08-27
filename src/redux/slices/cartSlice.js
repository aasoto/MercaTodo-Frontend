import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.push({...action.payload});
        },
        update: (state, action) => {
            state.forEach( item => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.totalPrice = action.payload.totalPrice;
                }
            });
        },
        remove: (state, action) => {
            const index = state.indexOf(
                state.find((item) => item.id === action.payload.id)
            );
            state.splice(index, 1);
        }
    },
});

// Action creators are generated for each case reducer function
export const { add, update, remove } = cartSlice.actions;
