import React, { Component } from 'react';
import axios from 'axios';
import YelpSearchBar from './YelpSearchBar';
import YelpListings from './YelpListings';

class YelpIndex extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      listings: []
    };
  }

  componentDidMount() {
    axios.get('/yelp')
    .then(resp => {
      //console.log(resp.data);
      const response = resp.data;
      const responseListings = response.businesses;
      console.log(responseListings);
      this.setState({
        searchText: this.state.searchText,
        listings: responseListings
      })
      console.log(this.state.listings);
    })
    .catch(err => console.log(`Error! ${err}`));
  }

  handleChange(event) {
    this.setState({
      listings: this.state.listings,
      searchText: event.target.value
    })
  }

  getFilteredListings() {
    const term = this.state.searchText.trim().toLowerCase();
    const listings = this.state.listings;
    console.log(listings);

    if (!term) {
      return listings;
    }

    return listings.filter(listing => {
      //console.log(business.name);
      return listing.name.toLowerCase().search(term) >= 0;
    });
  }

  renderDetails() {
    return (
      <div>
        <h1>Search Yelp for Businesses in the Austin, TX Area</h1>
        <hr></hr>
        <YelpSearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
        <hr></hr>
        <YelpListings
          listings={this.getFilteredListings()} />
      </div>
    );
  }

  render() {
    if (!this.state.listings) {
      return (
        <div>
          <h2>Loading the listings...</h2>
        </div>
      )
    }
    return this.renderDetails();
  }

}

export default YelpIndex;
