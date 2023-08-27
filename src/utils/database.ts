import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		if (!process.env.MONGODB_URI) {
			throw new Error('Unable to connect to database. Please provide database URL')
		}
    await mongoose.connect(process.env.MONGODB_URI)

    isConnected = true;

    console.log("MongoDB connected");
	} catch (error) {
		console.log("An error was encountered: ", error);
	}
};
