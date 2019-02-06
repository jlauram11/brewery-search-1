import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import FavoriteBreweries from './components/FavoriteBreweries/FavoriteBreweries';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    breweries: [],
    favoriteBreweryIds: [],
    query: '',
  };
  
  render() {
    const breweriesListItems = this.state.breweries
      .map(brewery => (
        <li key={brewery.id}>
          {brewery.name} {brewery.phone} {brewery.website_url}
          <button
              type="button"
              onClick={() => this.addToFavorites(brewery.id)}
          >
            ♥
          </button>
        </li>
      ));

    return (
      <div className="App">
        <Header />

        <form onSubmit={event => this.search(event)}>
          <input
              type="text"
              value={this.state.query}
              onChange={event => this.handleSearchChange(event)} />
          
          <button type="submit">Search</button>
        </form>

        <ul>
          {breweriesListItems}
        </ul>
        
        <FavoriteBreweries favoriteBreweries={this.state.favoriteBreweryIds} />
      </div>
    );
  }

  handleSearchChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  search(event) {
    event.preventDefault();

    axios.get('https://api.openbrewerydb.org/breweries?by_name=' + this.state.query)
      .then(response => {
        this.setState({
          breweries: response.data,
        });
      });
  }

  addToFavorites(id) {
    axios.post('http://localhost:3002/api/favorites', { id })
      .then(response => {
        this.setState({
          favoriteBreweryIds: response.data,
        });
      });
  }
}

export default App;
