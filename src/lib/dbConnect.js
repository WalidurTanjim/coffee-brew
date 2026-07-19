import { MongoClient } from 'mongodb';
import envConfig from './envConfig';

const databse = envConfig.MDB_NAME;
const uri = envConfig.MDB_URI;
const client = new MongoClient(uri);

export async function connectToMongoDB() {
     try {
          await client.connect();
          console.log("You successfully connected to MongoDB!");
          return client;
     } catch (err) {
          console.dir(err);
     }
}

const dbConnect = collection => {
     try{
          return client.db(databse).collection(collection);
     }catch(err) {
          console.error("Database connection error:", err);
          throw err;
     }
}

export default dbConnect;
