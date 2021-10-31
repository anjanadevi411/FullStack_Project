import React,{useState,useEffect} from 'react'

import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Book } from '../types';
import CardComp from '../components/CardComp'

type Params = {
  bookId: string
}

function BookDetails() {
  const [book, setBooks] = useState<Book | null>(null)
  const {bookId} = useParams<Params>()
  
  useEffect(() => {
    const getBook = async() =>{
      const bookDetails = await axios.get<Book>(`/books/${bookId}`)
      setBooks(bookDetails.data)
      console.log('books',bookDetails.data)
    }
      getBook()
     }, [bookId])

    return (
        <div>
            {book && <CardComp book={book}/>}
        </div>
    )
}

export default BookDetails
