import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static('public'));
const API_URL = 'https://api.exchangeratesapi.io/v1';
const API_Key = 'Your_APIkey_here';
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.post('/conversion', async (req, res) => { 
    const from = req.body.fromCurrency;
    const to = req.body.toCurrency;
    const amount = req.body.amount;

    try {
        const result = await axios.get(`${API_URL}/convert?access_key=${API_Key}&from=${from}&to=${to}&amount=${amount}`);
        console.log(result.data); // Log the entire response data
        res.render("index.ejs", { content: result.data.result, from: from, to: to, amount: amount });
    } catch (error) {
        console.error("Error fetching data:", error.response.data); // Log the error response data
        res.render("index.ejs", { content: error.response.data.error.message, from: from, to: to, amount: amount }); // Adjust error handling to display meaningful message
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})