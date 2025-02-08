const {MongoClient} = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main() {

const Db = process.env.ATLAS_URI
const client = new MongoClient(Db)

try{
    await client.connect()

    const collections = await client.db("Doctors").collections()
    
    collections.forEach((collection) => console.log(collection.s.namespace.collection))
    
    const data = await client.db("Doctors").collection("Available Doctors").find({}).toArray();
    console.log("getting data", data);
} catch(e) {
    console.error(e)
 }finally {
    await client.close()
 }
}

main()