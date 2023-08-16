const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__rsvp_log));

app.post('/submit_rsvp', (req, res) => {
    const { name, email, attendance, message } = req.body;

    const rsvpData = {
        name,
        email,
        attendance,
        message
    };

    fs.readFile('rsvp_responses.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const rsvpList = JSON.parse(data);
        rsvpList.push(rsvpData);

        fs.writeFile('rsvp_responses.json', JSON.stringify(rsvpList, null, 2), (err) => {
            if (err) {
                console.error(err); 
                return;
            }

            console.log('RSVP recorded:', rsvpData);
            res.send('RSVP recorded successfully.');
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
