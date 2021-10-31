import mongoose from 'mongoose'
import axios from 'axios'
import Book from '../models/Book'


const getData = async() =>{
    const resFromApi = await axios.get('https://www.googleapis.com/books/v1/volumes?q=a') 
    const booksData = resFromApi.data.items
    const transformed = booksData.map((book: any) => {
        return{
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            image: book.volumeInfo.imageLinks.thumbnail,
            //price: book.saleInfo.listPrice.amount,
            publishedYear: book.volumeInfo.publishedDate,
            genres: book.volumeInfo.categories,
            rating: book.volumeInfo.maturityRating
        }
    })
    await Book.insertMany(transformed)
}

mongoose.connect('mongodb://localhost:27017/book-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
}).then(async()=>{
    console.log('connected to database')
    return await getData()
}).then(()=>{
    process.exit(0)
})