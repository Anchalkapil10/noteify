import mongoose from "mongoose";
import bcrypt from "bcryptjs";        // used for defining the schema and handling password encryption

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {       // This line defines a new method on the userSchema called matchPassword. 
                                                                           // This method takes in a password as an argument and uses the bcrypt.compare() method to compare it with the hashed password stored in the database. 
return await bcrypt.compare(enteredPassword, this.password);              //The method returns a boolean value indicating whether the passwords match. 
  
};

// will encrypt password everytime its saved

//This code is a pre-save hook for a Mongoose userSchema. 
//It is a middleware function that is executed before the document is saved to the database. 
//The purpose of this hook is to hash the user’s password before it is stored in the database.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {           //this hook should be executed before the document is saved. 
    next();
  }
  const salt = await bcrypt.genSalt(10);  //If the password field has been modified, the bcrypt.genSalt method is called with an argument of 10 to generate a salt for hashing the password.
  this.password = await bcrypt.hash(this.password, salt); //The salt is then passed as an argument to the bcrypt.hash method along with the plain text password (this.password) to generate a hashed version of the password.
});
//This hook ensures that user passwords are always hashed before being stored in the database, which adds an extra layer of security to protect user data.

const User = mongoose.model("User", userSchema);

export default User;
