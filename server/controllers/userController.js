import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const updateUser = async (req, res, next) => {
    console.log(req.user.id);
    if (req.user.id !== req.params.id) {
        console.log("hello");
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                }
            }, { new: true });
        const { password, ...rest } = updatedUser;
        res.status(200).json(rest);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}