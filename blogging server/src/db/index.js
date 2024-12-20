import mongoose from "mongoose";

let connectDB = async () => {

    try {
        let connectionInstance  = await mongoose.connect(
           `${process.env.MONGO_URI}Blogging_Web`
        )
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);        

    }

    catch (error) {
        console.log(`monogo db connection failed ${error}` );
        process.exit(1);

    }

}

export default connectDB