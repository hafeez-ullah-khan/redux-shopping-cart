import * as actions from './actionTypes';

export const itemAddedToCart = id =>({
    type : actions.ITEM_ADDED_TO_CART,
    payload:{
        id
    }
})
export const itemRemovedFromCart = id =>({
    type : actions.ITEM_REMOVED_FROM_CART,
    payload:{
        id
    }
})
export const checkOut = id =>({
    type : actions.CHECK_OUT, 
})
export const shopAgain = id =>({
    type : actions.SHOP_AGAIN, 
})