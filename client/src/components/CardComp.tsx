import React from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";
import { Book } from '../types';

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { insertBookCart } from '../redux/action';

type CardCompProps={
  book: Book
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    maxWidth: 345,
    textAlign: "center",
    margin: 20,
  },
  media: {
    width: 345,
    height: 140,
  },
}));

function CardComp({book}:CardCompProps) {
  console.log('book Details')
  const classes = useStyles();

  const dispatch = useDispatch();
  const insertToCart = (book: any) => {
    dispatch(insertBookCart(book));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Card className={classes.root} >
        
        <CardActionArea>
                  <CardMedia
                      className={classes.media}
                      image={book.image}
                      />
                      {/* <img
                  src={book.image}
                  alt={book.title}
                  height="200px"
                  width="200px"
                /> */}
                  <CardContent>
                  <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>Title</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                            <Typography>{book.title}</Typography>
                          </AccordionDetails>
                  </Accordion> 
                  <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>Author</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                            <Typography>{book.author}</Typography>
                          </AccordionDetails>
                  </Accordion> 
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Genres</Typography>
                </AccordionSummary>
                {book.genres ? (
                  <>
                    <AccordionDetails>
                      <Typography>{book.genres[0]}</Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <Typography>{book.genres[1]}</Typography>
                    </AccordionDetails>
                  </>
                ) : (
                  <Typography>No data</Typography>
                )}
              </Accordion>
              <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>Price</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                            <Typography>{book.price}</Typography>
                          </AccordionDetails>
                  </Accordion> 
                     
                  <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                            <Typography>{book.description}</Typography>
                          </AccordionDetails>
                  </Accordion> 
                  </CardContent>
              </CardActionArea>
              <CardActions>
              <Link to={"/"}>
                      <Button size="small" color="primary">
                         Back
                      </Button>
                </Link>
                <Button size="small" color="primary"
                onClick={() => {
                  insertToCart(book);
                }}>
                BUY
              </Button>
                </CardActions>
      </Card>
      </div>
  );
}

export default CardComp;
