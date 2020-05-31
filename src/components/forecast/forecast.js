import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainTitle: {
    marginBottom: '20px',
    marginTop: '20px'
  },
  gridContainer: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '30px'
  },
  gridInner: {
    alignItems: 'stretch'
  },
  cardHeader: {
    fontSize: 18,
    color: '#1D1AB2'
  }
});

const QUERY = gql`
  query weather($city: String!) {
    getWeather(cityName: $city) {
      list {
        dt
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
  }
`;

const Forecast = ({ city }) => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { city },
  });
  const classes = useStyles();

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;


  const { getWeather: { list } } = data;

  const forecast = list.map((item, idx) => {
    const date = moment(item.dt * 1000).format('LLLL');
    return (
      <Grid key={idx} item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                aria-label="recipe" />
            }
            title={
              <Typography className={classes.cardHeader}>
                {date}
              </Typography>
            }
          />
          <CardContent>
            <Typography className={classes.title} color='textSecondary' gutterBottom>
              {item.weather[0].description}
            </Typography>
            <Typography variant='h5' component='h2'>
              {item.main.temp_c} °C
            </Typography>
            <Typography variant='body2' component='p'>
              Wind - {item.wind.speed} m/s
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  });

  return (
          <Box className={classes.gridContainer}>
            <Typography className={classes.mainTitle} variant='h3' component='h1'>
              5 day weather forecast {city}
            </Typography>
            <Grid item container spacing={4} className={classes.gridInner}>
              {forecast}
            </Grid>
          </Box>
  );
};

export default Forecast;
