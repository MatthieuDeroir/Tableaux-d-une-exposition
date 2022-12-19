import mongoose from "mongoose";

// const Schema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: 'string',
    password: 'string'
}
);

// const User = mongoose.model(
//     "User",
//     UserSchema
// );

export default UserSchema;

//dummy
