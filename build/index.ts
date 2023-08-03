import dotenv from 'dotenv'
import app from './app';
import mongoose from 'mongoose';

dotenv.config() 
const port=process.env.PORT||8080

async function startServer (){
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
    } catch (error) {
        console.log(error); 
    }
}

startServer()






