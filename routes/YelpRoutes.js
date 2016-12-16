// const axios = require('axios');
// const express = require('express');
//
// const router = express.Router();
//
//
// router.get('/', function(req, res, next) {
//
//     axios.get('https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=30.206515&longitude=-97.880577&sort_by=rating&limit=50', {
//             headers: {
//                 authorization: process.env.YELP_TOKEN,
//                 Content_Type: "application/x-www-form-urlencoded",
//                 client_id: process.env.YELP_CLIENT_ID,
//                 client_secret: process.env.YELP_CLIENT_SECRET
//             }
//         })
//         .then(resp => {
//             console.log(resp.data);
//             return res.json(resp.data);
//         })
//         .catch(err => res.json(err));
// });
//
// module.exports = router;
