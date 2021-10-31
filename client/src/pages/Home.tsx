import React,{useState, useEffect} from 'react'
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';

import {BookDocument} from '../../../src/models/Book'
import GridComp from './AllBooks';


function Home() {
    const [books, setBooks] = useState<BookDocument[]>([])
    const getAllBooks = async() =>{
        const allBooks = await axios.get<BookDocument[]>('/books')
        setBooks(allBooks.data)
        console.log('books',allBooks.data)
      }
    useEffect(() => {
        getAllBooks()
       }, [])
    return (
        <div>
            <NavigationBar />
            <GridComp books={books}/>
        </div>
        
    )
}

export default Home 

