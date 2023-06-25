const express=require("express")
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https")
const app=express()

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/',function(req,res){

    var firstName=req.body.firstName;
    var secondName=req.body.lastname;
    var email=req.body.email;

    var data ={
        members : [ {
            email_address:email,
            status : "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : secondName
            }

        }
    ]
    }

    var jsondata=JSON.stringify(data)

    const url="https://us17.api.mailchimp.com/3.0/lists/e3afb00b3b"

    const options ={
        method : 'POST',
        auth :"ru:14c169b06483f3f39e2a301c049f1ebf-us17"
    }


    var request= https.request(url,options,function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        }
        else{
            res.sendFile(__dirname +"/failure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata)
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server started")
})

//14c169b06483f3f39e2a301c049f1ebf-us17
//e3afb00b3b.
