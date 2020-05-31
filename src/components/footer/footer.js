import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
    fontSize: '20px'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <AcUnitIcon />
        <Link
          href='https://github.com/ivanovmain'
          variant="body2"
          color='secondary'
          className={classes.text}
        >
          {'GitHub '}
        </Link>
        <div className={classes.grow} />
        <Typography
          variant='body2'
          component='p'
          className={classes.text}
        >
          Created by Ivanov V.V
          <br/>
          Email:
          <Link
            href='mailto:ivanovvvmain@yandex.ru'
            variant="body2"
            color='secondary'
            className={classes.text}
          >
          {' ivanovvvmain@yandex.ru '}
        </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Footer;