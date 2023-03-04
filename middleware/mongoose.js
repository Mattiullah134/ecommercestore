import mongoose from "mongoose";


const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb+srv://mattiullah:Khokhar01.@cluster0.dl46ao8.mongodb.net/?retryWrites=true&w=majority');
    return handler(req, res);
}
export default connectDb;