const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const FILE = "data.json";
const NUTZERFILE = "users.json";

let aktuellerNutzer;

app.use(express.json());


// Automatisch zum Login-Fenster führen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.use(express.static('public'));

// Daten speichern
app.post('/save', (req, res) => {
    // Debug
    console.log(req.body);

    let databank = JSON.parse(fs.readFileSync(FILE));

    console.log(databank);

    const neuerEintrag = {
        user: aktuellerNutzer.username,
        nachricht: req.body.nachricht
    }

    databank.push(neuerEintrag);
    fs.writeFileSync('data.json', JSON.stringify(databank));

    res.send('Gespeichert!');
});

// Daten abrufen
app.get('/load', (req, res) => {
    if (fs.existsSync('data.json')) {
        const data = fs.readFileSync('data.json');
        // console.log("Data: " + JSON.parse(data));
        res.send(JSON.parse(data));
    } else {
        res.send({});
    }
});

// Login
app.post("/login", (req, res) => {
    const {nutzername, passwort} = req.body;

    console.log(nutzername, passwort);

    const NUTZER = JSON.parse(fs.readFileSync(NUTZERFILE));

    for(let i=0; i<NUTZER.length; i++){
        if(nutzername === NUTZER[i].username && passwort === NUTZER[i].passwort){
            aktuellerNutzer = NUTZER[i];
            res.json({success: true});
        }
    }
});


app.listen(3000, () => console.log('Server läuft auf Port 3000'));