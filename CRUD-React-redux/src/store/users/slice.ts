import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazmanito@gmail.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "John Doe",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gmail.com",
		github: "DUVAN100",
	},
];

export interface User {
    name:string;
    email: string;
    github: string;
}
export interface UserWithId extends User {
    id: string;
}

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID()
			state.push({ id, ...action.payload })
		},
        deleteUserById: (state, action:PayloadAction<UserId>) => {
            return state.filter(state => state.id === action.payload)
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
			if (!isUserAlreadyDefined){
                state.push(action.payload);
            }
		}
    },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
