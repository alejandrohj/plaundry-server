const express = require("express");
const { resolve } = require("path");
const router = express.Router()


// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET);
router.use(express.static("."));
router.use(express.json());

const calculateOrderAmount = items => {
  // It is always without . so this is 14 dollars! Get amount always from the database!!! Not from client. 
  let total = items.reduce((acc, elem) => {
    return acc += elem.quantity * elem.price;
  }, 0)
  let newTotal = total * 100;
  console.log(newTotal)
  return newTotal;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id
  });
});

module.exports = router;

