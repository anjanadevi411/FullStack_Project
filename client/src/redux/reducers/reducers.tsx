const defaultState = {
    cart: [],
    count: 0,
  };
  
  const reducerBookCart = (state = defaultState, action:any) => {
    switch (action.type) {
      case "INSERT_BOOK":
        const incomingBook = action.payload;
        const incomingBookName = incomingBook.title;
        const addBook = state.cart.find((book) => {
          // @ts-ignore
          if (incomingBookName === book.title) {
            return true;
          }
          return false;
        });
        
        return {
            ...state,
            cart: [...state.cart, addBook],
            count: state.count + 1,
          };
        
  
      case "REMOVE_BOOK":
        const filteredBook = state.cart.filter(
          // @ts-ignore
          (book) => book.title !== action.payload
        );
        return {
          ...state,
          cart: filteredBook,
          count: state.count - 1,
        };
  
      default:
        return state;
    }
  };
  
  export default reducerBookCart;
  