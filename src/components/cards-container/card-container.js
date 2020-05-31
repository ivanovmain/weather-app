import React from 'react';
import CityCard from '../city-card';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '30px'
  },
  gridInner: {
    alignItems: 'stretch'
  }
});

const CardContainer = ({cities}) => {
  const styles = useStyles();
  const citiesCards = cities.map((city, idx) => {
    return (
      <Grid key={idx} item xs={12} sm={6} md={4}>
        <CityCard city={city}/>
      </Grid>
    )
  });
  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={4} className={styles.gridInner}>
        {
          citiesCards.length === 0
            ? <Typography variant='h4' component='h2'>
              Weather list is empty.
              Please add city.
            </Typography>
            : citiesCards
        }
      </Grid>
    </div>
  )
};

export default CardContainer;