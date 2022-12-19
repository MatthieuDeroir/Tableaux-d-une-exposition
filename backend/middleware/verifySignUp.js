import UserSchema from '../models/userModel.js'
import mongoose from 'mongoose'

const User = mongoose.model('User', UserSchema);

const checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username already in use!" })
            return;
        }
        next();
    }
    )
}


const verifySignUp = {
    checkDuplicateUsername
}

export default verifySignUp;
//dummy