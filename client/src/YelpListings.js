import React from 'react';
import YelpListing from './YelpListing';
import { Grid, Row } from 'react-bootstrap';

const YelpListings = (props) => {

    return (

      <div>
        <Grid>
          <Row>
                {props.listings.map(listing => {
                  return (
                    <YelpListing
                      key={listing.id}
                      id={listing.id}
                      name={listing.name}
                      image_url={listing.image_url}
                      categories={listing.categories}
                      phone={listing.phone}
                      review_count={listing.review_count}
                      rating={listing.rating}
                      price={listing.price}
                      url={listing.url}
                    />
                  )
                })}


            </Row>
          </Grid>
        </div>
    );
}

export default YelpListings;
