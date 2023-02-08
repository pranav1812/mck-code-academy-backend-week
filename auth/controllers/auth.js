const AUTH_SERVICES = require('../services/auth');

const createUser = async (req, res) => {
    try {
        const {username, password, confirmPassword} = req.body;
        if (!username || !password || !confirmPassword) return res.status(400).json({error: 'MISSING_CREDENTIALS'});
        if (password !== confirmPassword) return res.status(400).json({error: 'PASSWORDS_DO_NOT_MATCH'});
        const newUser = await AUTH_SERVICES.createUser({username, password});
        return res.status(201).json({
            message: "Created New User", 
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const signinUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({error: 'MISSING_CREDENTIALS'});
        const token = await AUTH_SERVICES.signinUser({username, password});
        await redisClient.set(username, token);
        return res.status(200).json({
            message: "Signed In User", 
            data: token
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const validateToken = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const {token} = req.body;
        if (!token) return res.status(400).json({error: 'MISSING_TOKEN'});
        const username = await AUTH_SERVICES.validateToken(token);
        console.log("Valid: ", username);
        const savedToken = await redisClient.get(username);
        if (savedToken !== token) return res.status(401).json({error: 'FAKE_TOKEN'})
        return res.status(200).json({
            message: "Validated Token", 
            data: username
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    createUser,
    signinUser,
    validateToken
}