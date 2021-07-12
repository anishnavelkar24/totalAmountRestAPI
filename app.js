
const express = require("express");
const bodyParser = require("body-parser")

// New app using express module
const app = express();

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 500000 }));
app.use(bodyParser());

app.post("/calculateTaxAndTotal", function(req, res) {
  let items = req.body;
  let totalAmount=0;
  let Amount = 0;
  let totalTax=0;
  let discount = 0;
  let discountGiven='No';
  let currentTax;
  items.forEach(item => {
    Amount += item.quantity * item.price;
    currentTax=0;
    switch(item.itemCategory)
    {
      case 'Medicine' :
      case 'Food' :
        currentTax = 5;
        break;
      case 'Clothes' :
        currentTax = (item.price < 1000) ? 5 : 12;
        break;
      case 'Music' :
        currentTax = 3;
        break;
      case 'Imported' : 
        currentTax = 18; 
    }
    totalTax += (item.quantity * item.price)*(currentTax/100);
     
  });
  totalAmount += Amount + totalTax;
  if(totalAmount >= 2000)
  {
    discount = (totalAmount * 5 / 100);
    totalAmount -= discount;
    discountGiven = 'Yes';
  } 
  res.send("Item Amount: "+Amount+"\nTax: " +totalTax+"\nDiscount price: "+discount+"\nTotal Amount: " +totalAmount+"\nDscount Given: " +discountGiven);
});
 
app.listen(3003, function(){
  console.log("server is running on port 3003");
})
