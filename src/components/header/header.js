import React, { useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { observer } from 'mobx-react';
import store from '../../store';
import { gql } from 'apollo-boost';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => {
  return {
    typographyStyles: {
      flex: 1,
    },
    toolbarStyles: {
      justifyContent: 'space-between',
    },
    formStyles: {
      display: 'flex',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    TextFieldStyles: {
      marginRight: '15px',
      color: '#ffffff',
      fontSize: '20px',
    },
    appBarStyles: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    circularProgress: {
      marginLeft: '10px',
    },
    headerLink: {
      fontSize: 26,
    },
    inputBtn: {
      alignSelf: 'flex-start',
      height: '60px'
    }
  };
});

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to='/' {...props} />
));

const QUERY = gql`
  query hero($city: String!) {
    getCurrentWeather(cityName: $city) {
      weather {
        id
      }
    }
  }
`;

function Header(props) {
  const [city, setCity] = useState('');
  const [errorApi, setErrorApi] = useState(false);
  const [open, setOpen] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [IsValid, setIsValid] = useState(true);

  const styles = useStyles();

  const alert = (
    <Collapse in={open}>
      <Alert
        severity='error'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize='inherit'/>
          </IconButton>
        }
      >
        Undefined city!!!
      </Alert>
    </Collapse>
  );
  const sub = (e) => {
    e.preventDefault();
    if (city !== ''){
      setShowSpinner(true);
      setErrorApi(false);
      store
        .getCurrentWeather(city)
        .then((result) => {
          setShowSpinner(false);
          setErrorApi(false);
          store.addCity(city);
          setErrorApi(false);
          setCity('');
          setIsValid(true)
        })
        .catch((error) => {
          setShowSpinner(false);
          setOpen(true);
          setErrorApi(true);
          setIsValid(false)
        });
    }else{
      setIsValid(false)
    }
  };
  return (
    <AppBar className={styles.appBarStyles} position='static'>
      <Toolbar className={styles.toolbarStyles}>
        <Button
          className={styles.headerLink}
          color='secondary'
          component={LinkBehavior}
          to='/'
        >
          Weather APP
        </Button>
        <form
          onSubmit={sub}
          className={styles.formStyles}
          noValidate
          autoComplete='off'
        >
          <TextField
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            id='input-with-icon-textfield'
            label='Add location'
            variant='outlined'
            color='secondary'
            error={!IsValid}
            helperText={!IsValid ? 'Incorrect entry.' : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LocationCityIcon/>
                </InputAdornment>
              ),
              className: styles.TextFieldStyles,
            }}
          />
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            size='large'
            startIcon={<SaveIcon/>}
            className={styles.inputBtn}
          >
            Add city
            {showSpinner ? (
              <CircularProgress className={styles.circularProgress}/>
            ) : null}
          </Button>
        </form>
      </Toolbar>
      {errorApi ? alert : null}
    </AppBar>
  );
}

export default observer(Header);
