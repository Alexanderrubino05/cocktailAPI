import express from "express";
import cocktailData from "../data/cocktailData.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const filteredCocktails = cocktailData.filter((cocktail) => {
    return findCommonElement(cocktail.ingredients, req.body.ingredients);
  });

  res.json({ filteredCocktails });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === process.env.ACCESS_TOKEN) {
    next();
  } else {
    return res.sendStatus(401);
  }
}

function findCommonElement(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        // Return if common element found
        return true;
      }
    }
  }
  // Return if no common element exist
  return false;
}

export default router;
