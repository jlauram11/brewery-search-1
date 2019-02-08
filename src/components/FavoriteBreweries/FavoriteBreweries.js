import React, { Component } from 'react';
import axios from 'axios';

class FavoriteBreweries extends Component {
    state = {
        breweries: [],
    };

    componentWillReceiveProps(props) {
        Promise.all(props.favoriteBreweries.map(id => (
            axios.get('https://api.openbrewerydb.org/breweries/' + id)
                .then(response => response.data)
        )))
            .then(breweries => {
                this.setState({
                    breweries,
                });
            });
    }

    render() {
        const breweries = this.state.breweries
            .map(brewery => (
                <div className="card" key={brewery.id}>
                    <h3>{brewery.name}</h3>
                    <button
                        type="button"
                        onClick={() => this.props.onBreweryDelete(brewery.id)}
                    >
                        💔
                    </button>
                </div>
            ));
        
        return (
            <div>
                <h2>Favorites! ♥</h2>
                
                {breweries}
            </div>
        );
    }
}

export default FavoriteBreweries;
