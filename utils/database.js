import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDB =async ()=> { //while we are connecting to database, other things can go on
    mongoose.set('strictQuery', true);

    //if we are connected to the database
    if(isConnected){
        console.log('Mongodb is already connected');
        return;
    }

    if (!process.env.MONGODB_URI) return;
//if we are not already connected to the database run this code
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }) 

        isConnected = true;
        console.log('MongoDB is connected')
    } catch(error){
          console.log("mongodb error", error)
    }
}

