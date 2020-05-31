import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import store from '../../store';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cont: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: '20px'
  },
  cardHeader: {
    fontSize: 22,
    color: '#1D1AB2'
  }
});

const QUERY = gql`
  query weather($city: String!) {
    getCurrentWeather(cityName: $city) {
      main {
        temp_c
      }
      weather {
            description
            icon
        }
        wind {
            speed
        }
    }
  }
`;


function CityCard({city}) {

  const classes = useStyles();
  const {data, loading, error} = useQuery(QUERY, {
    variables: {city},
  });

  if (loading) return <CircularProgress/>;
  if (error) return `Error! ${error.message}`;

  const iconUrl =
    `http://openweathermap.org/img/w/${data.getCurrentWeather.weather[0].icon}.png`;
  const description = data.getCurrentWeather.weather[0].description;
  const wind = data.getCurrentWeather.wind.speed;

  const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={`/${city}`} {...props} />
  ));

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={iconUrl}
            aria-label='recipe' />
        }
        title={
          <Typography className={classes.cardHeader}>
            {city}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant='h4' component='h2'>
          {data.getCurrentWeather.main.temp_c} °C
        </Typography>
        <Typography variant='body2' component='p'>
          {description}
          <br/>
          Wind {wind} m/s
        </Typography>
      </CardContent>
      <CardActions className={classes.cont}>
        <Link className={classes.link} color='secondary' component={LinkBehavior}>
          5 day weather forecast
        </Link>
        <IconButton
          color='secondary'
          aria-label='delete'
          className={classes.margin}
          onClick={() => {
            store.deleteCity(city);
          }}
          fontSize='large'
        >
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default observer(CityCard);
