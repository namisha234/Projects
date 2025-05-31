import express from "express";
import cors from "cors";
import fs from "fs";


const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/roll", (req, res) => {
    let diceRoll = Math.floor(Math.random() * 6) + 1;

    let rollData = { dice: diceRoll, timestamp: new Date() };
    res.json( rollData.diceRoll );
    
    fs.appendFile("rolls.json", JSON.stringify(rollData) + "\n", (err) => {
        if(err) console.error("Error saving roll: ", err);
    });

});

app.get("/history", (req, res) => {
    fs.readFile("rolls.json", "utf-8", (err, data)=> {
        if(err){
            console.error("Error reading history: ", err);
            res.status(500).json({ error: "Failed to retrieve roll history"});
        }
        else{
            let rollHistory= data.trim() ? data.trim().split("\n").map(line => JSON.parse(line)) : [];
            res.json(rollHistory);
        }
    });
});

app.listen(8500, () => {
    console.log("🎲 Dice server running on port 8500");
})