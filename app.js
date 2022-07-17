const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

// To access the local file on the express server
app.use(express.static("public"));
// To use Body-Parser
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/5cf90d9d2a"

    const options = {
        method : "POST" , 
        auth : "kishkin10:324b6b2bd21ccd2a3f45efc3a3470232-us18"
    }

  const request =   https.request(url , options , function(response){

    if(response.statusCode === 200){
        
        res.sendFile(__dirname + "/success.html");
        
    }else{
        res.sendFile(__dirname + "/failure.html");
        
    }


        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end();
});


    app.post("/failure" , function(req , res){
        res.redirect("/")
    })

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});



// MailChimp APi Key : 324b6b2bd21ccd2a3f45efc3a3470232-us18
// 5cf90d9d2a