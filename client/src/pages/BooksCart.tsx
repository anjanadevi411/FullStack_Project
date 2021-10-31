import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { removeBookCart } from "../redux/action";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function BookCartDrawer() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const removeBook = (book: any) => {
    dispatch(removeBookCart(book));
  };
  // @ts-ignore
  const insertToCart = useSelector((state) => state.reducerBookCart.cart);
  // @ts-ignore
  const totalCount = useSelector((state) => state.reducerBookCart.count);

  const [state, setState] = useState({
    right: false,
  });
  // @ts-ignore
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          {/*  @ts-ignore */}
        {insertToCart.map((book) => (
          <ListItem button key={book}>
            <ListItemText
              primary={
                <img
                  src={book.image}
                  alt={book.title}
                  height="40px"
                  width="80px"
                />
              }
            />
            <ListItemText primary={book.title} />

            <DeleteIcon
              onClick={() => {
                removeBook(book.title);
              }}
            />

            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["Cart"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <span>{totalCount}</span>
          <Drawer
          // @ts-ignore
            anchor={anchor}
            // @ts-ignore
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default BookCartDrawer;
