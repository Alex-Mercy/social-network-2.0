import { Masks } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type StateType = {
    dialog: DialogType[]
}

type DialogType = {
    id: number,
    name: string;
    message: string;
}

const initialState: StateType = {
    dialog: [{
        id: 1,
        name: 'Maks',
        message: 'I will be in your neighborhood doing errands this…'
    },
    {
        id: 2,
        name: 'Aex',
        message: 'Wish I could come, but Ia m out of town this…'
    },
    {
        id: 3,
        name: 'Susie',
        message: 'Do you have Paris recommendations? Have you ever…'
    },
    ]
}


export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        sendMessage(state, action: PayloadAction<DialogType>) {
            state.dialog.push(action.payload);

        }
    }

})