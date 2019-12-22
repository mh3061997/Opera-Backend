const bodyParser=require('body-parser');
const express=require('express');
const app=express();
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  
  app.use(bodyParser.json())
  
  app.post('/endpoint', (req, res) => {
    console.log(req.body.Username);
    res.status(400).send({ "ReturnMsg": "User Already Exits" });
  })

  // the port where the application run
const port = process.env.PORT || 6001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
