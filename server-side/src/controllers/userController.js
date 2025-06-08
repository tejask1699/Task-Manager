const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { findUserByEmail, createUser } = require('../models/userModel')

// const getAllUsers = async (res) => {
//     try {
//         const users = await getUsers()
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }

const registerUser = async (req, res) => {
    const { user_name, user_password, user_email } = req.body

    try {
     
        const existingUser = await findUserByEmail(user_email)
        console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user_password, salt)
        const newUser = await createUser(user_name, hashedPassword, user_email)

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({ token, user: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}

const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body
    try {
        const user = await findUserByEmail(user_email);
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({token,user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = { registerUser,loginUser }