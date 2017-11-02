var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// GET all events for a hotel
module.exports.eventsGetAll = function(req, res) {
  var id = req.params.hotelId;
  console.log('GET events for hotelId', id);

  Hotel
    .findById(id)
    .select('events')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        response.message = doc.events ? doc.events : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _addEvent = function (req, res, hotel) {
  
  hotel.events.push({
    eventName : req.body.name,
    Description : req.body.Description, //parseInt(req.body.rating, 10),
    company : req.body.company,
    capacity : parseInt(req.body.capacity),
    rooms : parseInt(req.body.rooms),
    inputAddress : req.body.inputAddress,
    phone : parseInt(req.body.phone),
    inputCity : req.body.inputCity,
    inputState : req.body.inputState,
    inputZip : req.body.inputZip,
  });

  hotel.save(function(err, hotelUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(hotelUpdated.events[hotelUpdated.events.length - 1]);
    }
  });

};

module.exports.eventsAddOne = function(req, res) {

  var id = req.params.hotelId;

  console.log('POST event to hotelId', id);

  Hotel
    .findById(id)
    .select('events')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      if (doc) {
        _addEvent(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};
