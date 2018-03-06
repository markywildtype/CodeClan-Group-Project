//add Package model
//require Hotel model in searchPageRouter

const HotelEntity = require("./../../client/src/entities/hotelEntity");
const FlightEntity = require("./../../client/src/entities/flightEntity");
const FlightHotelPackage = require("./../../client/src/entities/flightHotelPackage");
const FlightPackage = require("./../../client/src/entities/flightPackage");

const Package = function(){

}

Package.prototype.createFlightPackages = function(flights){
  let flightPackagesArray = [];
  flights.results.forEach(function(flight){
    let outbound = flight.itineraries[0].outbound.flights;
    let inbound = flight.itineraries[0].inbound.flights;
    let totalPrice = flight.fare.total_price;
    let flightPackage = this.createFlightPackage(outbound, inbound, totalPrice);
    flightPackagesArray.push(flightPackage);
  }.bind(this));
  return flightPackagesArray;
}

Package.prototype.createFlightPackage = function(jsonOutboundFlightsArray, jsonInboundFlightsArray, totalPrice) {
  let outboundFlightEntities = [];
  jsonOutboundFlightsArray.forEach(function(jsonFlight){
    let flightEntity = this.createFlightEntity(jsonFlight);
    outboundFlightEntities.push(flightEntity);
  }.bind(this));

  let inboundFlightEntities = [];
  jsonInboundFlightsArray.forEach(function(jsonFlight){
    let flightEntity = this.createFlightEntity(jsonFlight);
    inboundFlightEntities.push(flightEntity);
  }.bind(this));

  let flightPackage = new FlightPackage(outboundFlightEntities, inboundFlightEntities, totalPrice)
  return flightPackage;
}

Package.prototype.createFlightEntity = function(flightJson) {
  let flightDetails = {};

  flightDetails.origin = flightJson.origin.airport;
  flightDetails.destination = flightJson.destination.airport;
  flightDetails.departureTime = flightJson.departs_at;
  flightDetails.arrivalTime = flightJson.arrives_at;

  let flightEntity = new FlightEntity(flightDetails);
  return flightEntity;
}

Package.prototype.createHotelEntity = function (hotelJson) {

let hotelDetails = {}
//hotelDetails["hotelName"] = hotelJson.property_name;
        hotelDetails.hotelName = hotelJson.property_name;
        hotelDetails.price = parseFloat(hotelJson.total_price.amount);
        hotelDetails.currency = hotelJson.total_price.currency;

//amenities
        let amenitiesArray = []
        hotelJson.amenities.forEach(function(amenity){
          if(amenity.amenity === "INTERNET_PUBLIC_AREAS"){
            amenitiesArray.push("INTERNET_PUBLIC_AREAS");
          } else if(amenity.amenity === "RESTAURANT"){
            amenitiesArray.push("RESTAURANT");
          } else if(amenity.amenity === "PARKING"){
            amenitiesArray.push("PARKING");
          } else if(amenity.amenity === "POOL"){
            amenitiesArray.push("POOL");
          } else if(amenity.amenity === "ACCESSIBLE_FACILITIES"){
            amenitiesArray.push("ACCESSIBLE_FACILITIES");
          }
        });
        hotelDetails.amenities = amenitiesArray;
//description
        let descriptionText = ""
        hotelJson.rooms[0].descriptions.forEach(function(textItem){
          descriptionText += textItem + " ";
        });
        hotelDetails.description = descriptionText;

//images
        if(hotelJson.images[0] !== undefined){
        hotelDetails.smallImage = hotelJson.images[0].url
      }
        if(hotelJson.images[1] !== undefined){
        hotelDetails.bigImage = hotelJson.images[1].url;
      }
//star rating
        if(hotelJson.awards[0] !== undefined){
          hotelDetails.starRating = hotelJson.awards[0].rating;
      }
//coordinates
        hotelDetails.latitude = hotelJson.location.latitude;
        hotelDetails.longitude = hotelJson.location.longitude;

        const newHotel = new HotelEntity(hotelDetails);
        return newHotel;
}


Package.prototype.createFlightHotelPackage = function(flightPackage, hotel, finalPrice){
  const flightHotelPackage = new FlightHotelPackage(flightPackage, hotel, finalPrice);
  return flightHotelPackage;
}


module.exports = Package;
