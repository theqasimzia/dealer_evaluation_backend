const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());

const dealerslist = require("./utils/dealers.json");

app.get("/price/:dealer/:product", function (request, response) {
  let dealers = dealerslist.dealers;
  let req_dealer = request.params.dealer;
  let req_product = request.params.product;
  let message = "The product is not available with this dealer";
  
  dealers.forEach((dealer) => {
    if (dealer.Dealer === req_dealer) {
      if (dealer.products[req_product]) {
        message = req_product + " costs " + dealer.products[req_product] + " at " + req_dealer;
      } else {
        message = req_product + " is not available with " + req_dealer;
      }
    }
  });
  
  response.send({"message": message});
});

app.get("/allprice/:product", function (request, response) {
  let dealers = dealerslist.dealers;
  let req_product = request.params.product;
  let priceslist = [];
  
  dealers.forEach((dealer) => {
    if (dealer.products[req_product]) {
      priceslist.push({key: dealer.Dealer, value: dealer.products[req_product]});
    }
  });

  if (priceslist.length > 0) {
    response.send({"prices": priceslist});
  } else {
    response.send({"message": "The product is not available with this dealer"});
  }
});

let port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
