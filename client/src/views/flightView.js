const FlightView = function(){

}

FlightView.prototype.createFlight = function(flightEntity){
  let flightDiv = document.createElement("div");
  flightDiv.classList.add("flight-class")

  //populate createFlightDiv
  let originSpan        = document.createElement("span")
  let departureTimeSpan = document.createElement("span")
  let arrivalTimeSpan   = document.createElement("span")
  let destinationSpan   = document.createElement("span")

  originSpan.innerText        = "FROM: " + flightEntity.origin + "\n";
  departureTimeSpan.innerText = "DEPART AT: " + flightEntity.departureTime.replace("T", " ") + "\n";
  arrivalTimeSpan.innerText   = "ARRIVAL AT: " + flightEntity.arrivalTime.replace("T", " ") + "\n";
  destinationSpan.innerText   = "TO: " + flightEntity.destination;

  flightDiv.appendChild(originSpan);
  flightDiv.appendChild(departureTimeSpan);
  flightDiv.appendChild(arrivalTimeSpan);
  flightDiv.appendChild(destinationSpan);

  return flightDiv;
}

FlightView.prototype.createOutboundFlight = function(outboundFlightEntity){
  // console.log(outboundFlightEntity);
  let flightGoingImg = document.createElement("img");
  let outboundFlightDiv = document.createElement("div");
  let outboundHeaderDiv = document.createElement("div");
  let outboundBodyDiv = this.createFlight(outboundFlightEntity[0]);

  flightGoingImg.src = "./images/flight-going.jpg"

  outboundFlightDiv.appendChild(flightGoingImg)
  outboundFlightDiv.appendChild(outboundHeaderDiv);
  outboundFlightDiv.appendChild(outboundBodyDiv);

  return outboundFlightDiv;
}

FlightView.prototype.createInboundFlight = function(inboundFlightEntity){
  let flightReturningImg = document.createElement("img");
  let inboundFlightDiv = document.createElement("div");
  let inboundHeaderDiv = document.createElement("div");
  let inboundBodyDiv   = this.createFlight(inboundFlightEntity[0]);

  flightReturningImg.src = "./images/flight-returning.jpg"

  inboundFlightDiv.appendChild(flightReturningImg)
  inboundFlightDiv.appendChild(inboundHeaderDiv);
  inboundFlightDiv.appendChild(inboundBodyDiv);

  return inboundFlightDiv;
}

FlightView.prototype.createFlightPriceAndChangeAction = function(flightPrice){

  let priceDiv         = document.createElement("div");
  priceDiv.classList.add("flight-price-class")
  let priceSpan        = document.createElement("span");
  priceSpan.innerText  = "\n FLIGHT PRICE: £" + flightPrice.toFixed(2);

  priceDiv.appendChild(priceSpan);
  return priceDiv;
}


FlightView.prototype.createFlightView = function(flightPackage){
  let mainFlightDiv     = document.createElement("div");
  mainFlightDiv.classList.add('flight-main-class')

  let outboundFlightDiv = this.createOutboundFlight(flightPackage.outboundFlights);
  let inboundFlightDiv  = this.createInboundFlight(flightPackage.inboundFlights);
  let priceDiv          = this.createFlightPriceAndChangeAction(flightPackage.flightPrice);

  mainFlightDiv.appendChild(outboundFlightDiv);
  mainFlightDiv.appendChild(inboundFlightDiv);
  mainFlightDiv.appendChild(priceDiv);
  // console.log(flightPackage);
  return mainFlightDiv;
}


module.exports = FlightView;
