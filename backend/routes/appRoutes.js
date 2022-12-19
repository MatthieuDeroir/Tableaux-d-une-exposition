import {
    addNewUser,
    getUsers,
    getUserWithId,
    updateUser,
    deleteUser
} from '../controllers/userControllers/userController.js';

import authController from "../controllers/userControllers/authController.js";
import verifySignUp from "../middleware/verifySignUp.js";

const routes = (app) => {
    app.route('/users')
        //GET endpoint
        .get(getUsers)

        // POST endpoint
        .post(addNewUser);
    app.route('/user/:UserId')
        // Get a specific file
        .get(getUserWithId)

        // Update a specific file
        .put(updateUser)

        // Deleter a specific file
        .delete(deleteUser);


    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsername,
        ],
        authController.signup
    );

    app.post("/auth/signin", authController.signin)

}
export default routes;

