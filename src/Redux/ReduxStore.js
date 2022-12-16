import {combineReducers, configureStore} from "@reduxjs/toolkit";

const ADD_ITEM_LIST = 'ADD_ITEM_LIST'
const TOGGLE_ITEM = 'TOGGLE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

const postListReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM_LIST: return action.itemList;
        case TOGGLE_ITEM:
            return state.map(item =>
                item.id === action.id ? { ...item, liked: !item.liked } : item
            )
        case DELETE_ITEM:
            return state.filter(item =>
                item.id !== action.id
            )
        default: return state
    }
}

export const addItemListAction = (itemList) => {
    return {
        type: ADD_ITEM_LIST,
        itemList: itemList
    }
}

export const toggleItemAction = id => {
    return {
        type: TOGGLE_ITEM,
        id
    }
}

export const deleteItemAction = id => {
    return {
        type: DELETE_ITEM,
        id
    }
}

const reducers = combineReducers({itemListState: postListReducer})

export const store = configureStore({reducer: reducers})