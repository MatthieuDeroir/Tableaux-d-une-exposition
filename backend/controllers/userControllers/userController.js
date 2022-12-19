import mongoose from 'mongoose';
import UserSchema from '../../models/userModel.js';

const User = mongoose.model('User', UserSchema);

export const addNewUser = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const getUsers = (req, res) => {
    User.find({}, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const getUserWithId = (req, res) => {
    User.findById(req.params.UserId, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.UserId }, (err, User) => {
        console.log(User)
        if (err) {
            res.send(err);
            return;
        }
    })
}

export const deleteUser = (req, res) => {
    User.remove({ _id: req.params.UserId }, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted User' });
    })
}
