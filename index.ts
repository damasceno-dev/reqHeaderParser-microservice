import cors from 'cors'
import express from 'express'

// overflow y hidden 
// 2) change 'link' styles  and colors to be like tailwind

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

const isDateValid = (dateStr: string) : Date | undefined => {
  let dateObj
  if (dateStr === 'now') {
    dateObj = new Date()
  } else {
    dateObj = new Date(dateStr);
  }
   
  if (isNaN(dateObj.getTime())) {
    return undefined
  } else {
    return dateObj
  }
}

app.get('/api/:date', (req, res) => {
  const dateStr:string = req.params.date;
  const date = isDateValid(dateStr)
  if (date === undefined) {
    return res.json('invalid date')
  } 

  const utcDate = date.toUTCString();
  const unixDate = date.getTime();
  return res.json({unix: unixDate, utc: utcDate})
})

app.get('/api/now', (req, res)=> {
  const date = new Date()
  const utcDate = date.toUTCString();
  const unixDate = Math.floor( date.getTime() /1000)
  return res.json({unix: unixDate, utc: utcDate})
})



// listen for requests :)
const port = 3333
app.listen(3333, () => {
  console.log('Your app is listening on port ' + port);
});
