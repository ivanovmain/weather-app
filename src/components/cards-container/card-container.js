import React from 'react';
import CityCard from '../city-card';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
        {citiesCards}
      </Grid>
    </div>
  )
};

export default CardContainer;