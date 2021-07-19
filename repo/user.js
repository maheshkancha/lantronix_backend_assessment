const User = require('../schema/user');
const sendEmail = require('../send-email');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {username, firstname, lastname, email, password } userPayload - Accepts user object
 * @returns { message: "A verification mail has been sent to your registered mail." }
}
 */
const registerUser = async userPayload => {
    console.log('User Repo: registerUser()');
    const { username, firstname, lastname, email, password } = userPayload;
    if (Boolean(username) && Boolean(firstname) && Boolean(lastname) && Boolean(email) && Boolean(password)) {
        try {
            const hashedPwd = await bcrypt.hash(password, 10);
            const user = {
                username,
                firstname,
                lastname,
                email,
                token: hashedPwd
            }
            const userObj = new User(user);

            await userObj.save(err => {
                if (err)
                    console.error('Error while saving user details: ', err);
            });

            sendEmail(firstname);

            return { message: "A verification email has been sent to your registered email." };
        } catch {
            return { message: "Internal server error occurred." };
        }
    }
    return { message: "Please supply all fields - [username, firstname, lastname, email, password]." };
}

/**
 * 
 * @param {username, password} creds - Accepts credentials to validate the existance of user
 * @returns - User object
 */
const authenticateUser = async creds => {
    console.log('User Repo: authenticateUser()');
    const { username, password } = creds;
    const user = await User.findOne({ username });
    if (user) {
        try {
            const { token, _id, email, firstname, lastname } = user;
            if (await bcrypt.compare(password, token)) {
                const responseObj = {
                    token,
                    user: {
                        id: _id,
                        username,
                        firstname,
                        lastname,
                        email
                    }
                }
                return responseObj;
            } else {
                return { message: "Password is wrong!" };
            }
        } catch {
            return { message: "Internal server error occurred" };
        }
    }

    return { message: 'Cannot find the user' };
}

module.exports = {
    registerUser,
    authenticateUser
}
