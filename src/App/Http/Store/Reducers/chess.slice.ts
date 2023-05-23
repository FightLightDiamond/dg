import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IState {
	x: number,
	y: number,
	cart?: [
		{id: 1, itemId: null},
		{id: 2, itemId: null},
		{id: 3, itemId: null},
		{id: 4, itemId: null},
		{id: 5, itemId: null},
		{id: 6, itemId: null},
		{id: 7, itemId: null},
		{id: 8, itemId: null},
	]
	turns?: [
		{id: 1, itemId: null},
		{id: 2, itemId: null},
		{id: 3, itemId: null},
		{id: 4, itemId: null},
		{id: 5, itemId: null},
		{id: 6, itemId: null},
		{id: 7, itemId: null},
		{id: 8, itemId: null},
		{id: 9, itemId: null},
		{id: 10, itemId: null},
		{id: 11, itemId: null},
		{id: 12, itemId: null},
		{id: 13, itemId: null},
		{id: 14, itemId: null},
		{id: 15, itemId: null},
	]
}

const initialState: IState = {
	x: 0,
	y: 0
}

export const chessSlice = createSlice({
	name: 'chess',
	initialState,
	reducers: {
		move: (state: IState, action: PayloadAction<{
			x: number, y: number
		}>) => {
			state.x = action.payload.x
			state.y = action.payload.y
		},
	},
})

export const {
	move,
} = chessSlice.actions

export default chessSlice.reducer
