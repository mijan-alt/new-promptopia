import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique:[true, 'Email already exist!'],
        required: [true, 'email is required'],
    },
    username: {
        type: String,
        required: [true, 'email is required'],
         match : [  
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
         "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]

    },
 
    image : {
        type : String,
    }
});

/**if there is a collection with name User in our database,we wanna make use of that , otherwise
 * we wanna create a new collection with the name 'User' and build that collection the the UserSchema 
 * blueprint
 */
const User =models.User || model("User", UserSchema);

export default User