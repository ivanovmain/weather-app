import React from 'react';
import { observer } from 'mobx-react';
import store from '../../store';
import { configure } from 'mobx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from '../header';
import CardContainer from '../cards-container';
import { Route, Switch } from 'react-router-dom';
import Forecast from '../forecast';
import Footer from '../footer';

const client = new ApolloClient({
  uri: 'https://7b3u2.sse.codesandbox.io/',

});

configure({ enforceActions: 'observed' });

@observer
class App extends React.Component {
  render() {
    const { cities } = store;
    return (
      <ApolloProvider client={client}>
        <Router>
        <Box>
          <CssBaseline/>
          <Grid container direction='column'>
            <Grid item>
              <Header />
            </Grid>
            <Grid item container>
              <Grid item xs={false} sm={2}/>
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route path="/"
                         exact
                         render={
                           () => <CardContainer cities={cities}/>
                         } />
                  <Route path='/:city'
                         render={
                           ({match})=>{
                             const { city } = match.params;
                             return <Forecast city={city}/>
                           }}/>
                </Switch>
              </Grid>
              <Grid item xs={false} sm={2}/>
            </Grid>
          </Grid>
          <Footer/>
        </Box>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
