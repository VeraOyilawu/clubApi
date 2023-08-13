const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://alexandravera789:RW9CIAcN3Jt60btz@cluster0.1lkei5u.mongodb.net/")
.then(()=> {
    console.log("connection sucessfully........");
})
.catch( () => {
    console.log("unable to connect........");
})  