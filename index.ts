import cors from 'cors'
import express from 'express'

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.set('trust proxy', true)


app.get("/api/whoami", (req, res) => {
  console.log(req.headers)
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  const ipaddress = req.ip;
  console.log(req.ip)
  return res.json({
    "ipaddress": ipaddress,
    "language": language,
    "software": software
  })
})

// listen for requests :)
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
