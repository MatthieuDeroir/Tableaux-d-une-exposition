import config from '../../authConfig.js'
import mongoose from 'mongoose';
import UserSchema from '../../models/userModel.js';

const User = mongoose.model('User', UserSchema);

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signup = (req, res) => {
    const folderName = `../frontend/public/medias/${req.body.username}`;
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
};

const signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                console.log(err)
                console.log(req.body)
                res.status(500).send({ message: err });
                console.log('server error')
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not Found." });
                console.log('user not found')
            }
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            );
            if (!passwordIsValid) {
                console.log('wrong password')
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user._id }, config, {
                expiresIn: 86400 // 24 heures,
            })
            console.log(`token logging success`)

            res.status(200).send({
                message: 'connexion réussie !',
                id: user._id,
                username: user.username,
                accessToken: token
            });



            console.log(`success logging in ${user.username} : ${token}, ${user._id}`)

        });

};

const authController = {
    signup,
    signin
}

export default authController;