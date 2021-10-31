import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Login from './Login';
import Logout from './Logout';
import { User } from '../types';
import BookCartDrawer from '../pages/BooksCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavigationBar() {
  const name = JSON.stringify(localStorage.getItem('name') )
  
  const [user, setUser] = useState<User>()

  const setUserData = (user:User) =>{
    setUser(user)
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!(localStorage.getItem('name')) ?
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Online Book Store
          </Typography>
          
          <Login setUser={setUserData}/> 
        </Toolbar>
      </AppBar>
      :
       <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Online Book Store
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {name}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <BookCartDrawer/>
          </Typography>
          <Logout/>
        </Toolbar>
      </AppBar> }
    </div>
  );
}

export default NavigationBar
