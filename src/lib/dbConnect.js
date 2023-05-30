import mongoose from "mongoose";

const MONGO_URI_DEVELOPMENT = process.env.NEXT_PUBLIC_MONGO_URI_DEVELOPMENT;

if (!MONGO_URI_DEVELOPMENT) {
  throw new Error("Missing MONGO_URI_DEVELOPMENT environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true, // Add these options to avoid deprecation warnings
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGO_URI_DEVELOPMENT, opts)
      .then(mongoose => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch(error => {
        // Add error handling
        console.error("Error connecting to MongoDB:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
