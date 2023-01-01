const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 

app.get("/",(req ,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
const email=req.body.em;
const fn=req.body.fn;
const ln=req.body.ln;
const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: fn,
                LNAME: ln,
            }
        }
    ]
}
const jsonDATA=JSON.stringify(data);
const url="https://us10.api.mailchimp.com/3.0/lists/f3c4ec6893";
const options ={
    method:"POST",
    auth:"mukul:9607e0652af89d212a9a487a47574db4-us10"
}
const request = https.request(url,options,function(response){
   if(response.statusCode === 200)
   {
    res.sendFile(__dirname+"/success.html");

   }
   else{
    res.sendFile(__dirname+"/faliure.html");
   } 
    response.on("data",(data)=>{
        console.log(JSON.parse(data));
    });
});
request.write(jsonDATA);
request.end();

https.request(url,options,(response)=>{

});
});
app.post("/faliure",(req,res)=>{
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000");
});

// api key
// 9607e0652af89d212a9a487a47574db4-us10

// audience id f3c4ec6893