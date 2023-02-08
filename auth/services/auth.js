const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const createUser= async(user)=> {
    const {username, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashedPassword
    };
    await User.create(newUser);
    return newUser;
}

const signinUser= async(user)=> {
    const {username, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    let getFromDB = await User.findByPk(username);
    console.log('from db', getFromDB);
    getFromDB = getFromDB.dataValues;
    if (getFromDB=== {} || !getFromDB) {
        throw new Error('USER_NOT_FOUND');
    }
    const isPasswordCorrect = await bcrypt.compare(password, getFromDB.password);
    if (!isPasswordCorrect) {
        throw new Error('WRONG_PASSWORD');
    }
    const token = jwt.sign({username}, "SecretSauce96", {expiresIn: '1h'});
    return token;
}

const validateToken= async(token)=> {
    const decodedToken = jwt.verify(token, "SecretSauce96");
    if (!decodedToken) {
        throw new Error('INVALID_TOKEN');
    }
    const {username} = decodedToken;
    return username;
}

module.exports = {
    createUser,
    signinUser,
    validateToken
}