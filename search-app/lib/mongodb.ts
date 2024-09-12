// import { MongoClient } from 'mongodb';

// // MongoDB URI from environment variable
// const uri: string = process.env.MONGODB_URI || '';
// console.log(uri)
// const options: object = {};

// // Check if the URI is provided
// if (!uri) throw new Error('Please add your Mongo URI to .env.local');

// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// let client: MongoClient = new MongoClient(uri, options);
// let clientPromise: Promise<MongoClient>;

// // Check the environment and ensure that the MongoClient is initialized only once in development
// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, always create a new connection
//   clientPromise = client.connect();
// }
// console.log(clientPromise)
// export default clientPromise;
import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

console.log("MongoDB URI:",uri)

const options = {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise