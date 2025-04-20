//create the server
const express =require("express");
const cors = require("cors");
const application = express();
const mysql = require("mysql2");
const port = 4000;
const{check, validationResult}= require("express-validator");
let formValidation = validateRatingFormData();
application.use(cors({
   // origin: 'http://127.0.0.1:5500',
   origin: '*',
   methods: ['GET', 'POST'],
    credentials: true
}));

//static routing
application.use("/",express.static("./website"));

//declaring used file
//html routing
//from express libaray
application.use(express.urlencoded({extended:false}));
//using json routing
application.use(express.json());

application.post("/dataProcessing",formValidation,(request,response)=>{
    let message={};
// creating form data using name attribute
const error = validationResult(request);

if(!error.isEmpty()){

    console.log("There had been some errors.");
    
} else{

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const phoneNumber = request.body.phoneNumber;
    const pages = request.body.pages;
    const recipes = request.body.recipes;
    const rating = request.body.rating;
    const comments = request.body.comments;
    const rateRange =request.body.rateRange;

    //checking the data
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/ ;
    let phonePattern=/^[0-9]{10}$/;
    let namePattern=/^[a-zA-Z\-'\s]{2,}$/;

    let validName = (firstName.length > 2  && firstName.match(namePattern)) &&  (lastName.length > 2  && lastName.match(namePattern));
    let validEmail =  email.match(emailPattern);
    let validPhone = phoneNumber.length ==10  && phoneNumber.match(phonePattern);
    let validRating = rating != null;

    if(validName && validEmail && validPhone && validRating){
        message ={status:true, err:""};
        addUserOpinion(firstName,lastName,email,phoneNumber,pages,recipes,rating,comments,rateRange);
    }else{
        message ={
            status:false,
            err:"Error!!! Please provide real data."};

    }
    response.json(message);
    }
});


function addUserOpinion(firstName,lastName,email,phoneNumber,pages,recipes,rating,comments,rateRange){
    let db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"the_recipes_hub",
        port:3306
    });
    db.connect((err)=>{
        let sql = `INSERT INTO user_opinion (firstName,lastName,email,phoneNumber,pages,recipes,rating,comments,rateRange) VALUES( '${firstName}', '${lastName}','${email}', '${phoneNumber}','${pages}', '${recipes}','${rating}', '${comments}','${rateRange}')`;

        db.query(sql,function(error,result){
            if(error) {
                throw error;
            }
            console.log("Data has been inserted successfully.");

            db.end();
        });
    });
}
function validateRatingFormData(){
    return[
        check("firstName")
        .isAlpha().withMessage("Please use letters only.")
        .isString().withMessage("Must be a string."),
        check("lastName")
        .isAlpha().withMessage("Please use letters only.")
        .isString().withMessage("Must be a string."),
        check("email").isEmail().withMessage("Please write a proper email."),
        check("phoneNumber").isNumeric().withMessage("Please use numbers only.")
        .isLength({min:10,max:10}).withMessage("Length must be 10 digits.")
        /*check("pages").custom((value)=>{
            const list = ['mainpage','contact','about','recipe'];
            if(list.includes(value)){
                return true;
            } else{
                return false;
            }
        }).withMessage("Please choose from the provided list."),
        check("recipes").custom((value)=>{
            const list = ['Shawarma','Fattoush','Manakish','Ma’amoul','Pizza','Lasagna','steak','ceasersalad','MacandCheese','Brownies'];
            if(list.includes(value)){
                return true;
            } else{
                return false;
            }
        }).withMessage("Please choose from the provided list."),
        check("rating").custom((value)=>{
            const list = ['1','2','3','4','5'];
            if(list.includes(value)){
                return true;
            } else{
                return false;
            }
        }).withMessage("Please choose from the provided list.")*/
    ]
}

// Handle contact form submissions

// Handle contact form submissions
application.post("/contact", (request, response) => {
    // Extract form data
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const gender = request.body.gender;
    const mobile = request.body.mobile;
    const date = request.body.date;
    const email = request.body.email;
    const language = request.body.language;
    const message = request.body.message;
    
    let responseMessage = {};
    
    // Validate data
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^\d{10}$/;
    let namePattern = /^[a-zA-Z]{2,}$/;
    
    let validFirstName = firstName && firstName.length >= 2 && namePattern.test(firstName);
    let validLastName = lastName && lastName.length >= 2 && namePattern.test(lastName);
    let validEmail = email && emailPattern.test(email);
    let validMobile = mobile && phonePattern.test(mobile);
    let validGender = gender && (gender === "male" || gender === "female");
    let validDate = date && date !== "";
    let validLanguage = language && language !== "";
    let validMessage = message && message.trim() !== "";
    
    if(validFirstName && validLastName && validEmail && validMobile && validGender && validDate && validLanguage && validMessage) {
        // Store or process data
        // In this version we're not using MongoDB to simplify things
        console.log('Contact form received:', {
            firstName,
            lastName,
            gender,
            mobile,
            dateOfBirth: new Date(date),
            email,
            language,
            message
        });
        
        responseMessage = {
            status: true, 
            message: "Thank you! Your message has been received successfully and we will contact you soon."
        };
    } else {
        responseMessage = {
            status: false,
            err: "Please make sure to enter valid data in all fields"
        };
    }
    
    response.json(responseMessage);
});

// Route to get all contacts (for admin)
application.get("/admin/contacts", (req, res) => {
    // In this version we return an empty array since we're not using a database
    res.json({
        status: true,
        contacts: []
    });
});

//server port
application.listen(port,() =>{
    console.log("server is running on port " + port);
});

