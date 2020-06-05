import * as actions from './actionTypes';
import products from './products.json';
const initialState={
    products: products,
    itemsInCart:[],
    totalPrice:0,
    checkedOut:false
  };

export default function reducer(state=initialState,action){ 
     switch(action.type){
         case actions.ITEM_ADDED_TO_CART: 
         let product = state.products.find(product=> product.id === action.payload.id)
         let inCartProduct= state.itemsInCart.find(product=> product.id === action.payload.id)
         if(inCartProduct){
             if(inCartProduct.quantity<product.quantity){

                inCartProduct.quantity += 1
                let newTotalPrice = state.totalPrice + inCartProduct.price 
                return{
                    ...state,
                    totalPrice: newTotalPrice
                      }
             }
             else
             {
                return state; 
             }
         }else{ 
            let newTotalPrice = state.totalPrice + product.price 
            return{
                ...state,
                itemsInCart: [...state.itemsInCart, {...product, quantity:1}],
                totalPrice : newTotalPrice
            }
         } 
         case actions.ITEM_REMOVED_FROM_CART: 
          inCartProduct= state.itemsInCart.find(product=> product.id === action.payload.id)
         if(inCartProduct)
         {
            let newTotalPrice = state.totalPrice - inCartProduct.price;

            inCartProduct.quantity -= 1
            if( inCartProduct.quantity<1){
                 return{
                    ...state,
                    itemsInCart:   state.itemsInCart.filter(product => product.id != action.payload.id),
                    totalPrice : newTotalPrice
                  }
            }
            else
            {
                return{
                    ...state,
                    totalPrice : newTotalPrice
                }
            }
         }
         return state; 
         case actions.CHECK_OUT:
            state.itemsInCart.map(product => {
                let actualProduct  = state.products.find(prd=> prd.id === product.id);
                actualProduct.quantity -= product.quantity; 
            } )

              return{
                  ...state,
                  itemsInCart:[],
                  totalPrice:0,
                  checkedOut:true
                };
         case actions.SHOP_AGAIN:
              return{
                  ...state,
                  checkedOut:false
                };
         default: 
             return state; 
     }
}