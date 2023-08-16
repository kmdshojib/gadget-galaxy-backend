import mongoose from 'mongoose';
import app from './app';


const port: any = process.env.PORT || 5000;


const mongoDBUrl: string = "mongodb://127.0.0.1:27017/laptop"
const main = async () => {
    try {
        await mongoose.connect(mongoDBUrl);

        console.log("DB connection established");

        app.listen(port, () => {
            console.log(`Product listening on port ${port} `)
        })


    } catch (error) {
        console.log({ error })
    }
}

main();