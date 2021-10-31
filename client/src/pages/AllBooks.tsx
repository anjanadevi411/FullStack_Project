import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { insertBookCart } from '../redux/action';


const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
    margin:3,
    //maxWidth: 500,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function AllBooks({books}: any) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const insertToCart = (book: any) => {
    dispatch(insertBookCart(book));
  };


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      {books.map((book:any)=> {
            return(
        <Grid item xs={4}>
        <Card className={classes.root}>
        
      <CardActionArea>
                {/* <CardMedia
                    className={classes.media}
                    image={book.image}
                    /> */}
                    <img
                src={book.image}
                alt={book.title}
                height="200px"
                width="200px"
              />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title: {book.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        author: {book.author}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        published Year: {book.publishedYear}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
            <CardActions>
            <Link to={`/books/${book._id}`}>
                    <Button size="small" color="primary">
                       Details
                    </Button>
            </Link>
                   
                    <Button size="small" color="primary"
                onClick={() => {
                  insertToCart(book);
                }}
                >
                BUY
              </Button>
                    
                </CardActions>
          </Card>
        </Grid>
         )})}
      </Grid>
    </div>
  );
}

export default AllBooks
