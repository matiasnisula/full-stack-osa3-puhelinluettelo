const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log("connected to MongoDb");
    })
    .catch(error => {
        console.log("error connecting to MongoDb: ", error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate : (input) => {
            const re = /^\d{2,3}-\d{6,}/;
            return re.test(input);
        },

        required: true
    }
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Person", personSchema);