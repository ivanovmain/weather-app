import { observable, action } from 'mobx';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

class Store {
  @observable cities = [];

  client = new ApolloClient({
    uri: 'https://7b3u2.sse.codesandbox.io/',
  });

  @action setCity(cities) {
    this.cities = cities;
  }

  @action addCity(city) {
    this.setCity([...this.cities, city]);
  }

  @action getCurrentWeather(city) {
    return this.client.query({
      query: gql`
        query weather($city: String!) {
          getCurrentWeather(cityName: $city) {
            cod
          }
        }
      `,
      variables: { city },
    });
  }

  @action deleteCity(city) {
    const newArr = this.cities.filter((item) => item !== city);
    this.setCity(newArr);
  }
}

export default new Store();
