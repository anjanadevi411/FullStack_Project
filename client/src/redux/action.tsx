export const insertBookCart = (book: string) => {
    return {
      type: "INSERT_BOOK",
      payload: book,
    };
  };
  
  export const removeBookCart = (bookName: string) => {
    return {
      type: "REMOVE_BOOK",
      payload: bookName,
    };
  };