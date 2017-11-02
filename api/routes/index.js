var express = require('express');
var router = express.Router();
var multer = require('multer')

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlEvents = require('../controllers/events.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// Hotel routes
// router.route('/upload').post(core.upload);
// router.route('/upload').options(core.upload);
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .post(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);


// Review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/events')
    .get(ctrlEvents.eventsGetAll)
    .post(ctrlEvents.eventsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);
// Authentication
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});
//1) To save image to a sever
//2) To link that image with hotel
// we need hotelId and Filename
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('photo'), function(req, res, next) {
    path = req.file.path;
    var referrer = req.header("Referer").split("/");
    var hotelId = referrer[referrer.length - 1];
    ctrlHotels.addHotelImage(hotelId, path);
    return res.send(path);
});
/* GET home page. */

module.exports = router;