const userService = require('../services/userService');
const authService = require('../services/authService');

class userProfileController {
    static async getUserProfile (req, res) {
        try {
            const { userId } = req;
            const user = await userService.getUserById(userId);
            const serializedUser = await userService.serializeUser(user);

            return res.status(200).json({
                status: 'success',
                data: serializedUser
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async updateUserProfile (req, res) {
        try {
            const { userId } = req;
            const { firstName, lastName, email } = req.body;
            const user = await userService.updateUser(userId, {
                firstName,
                lastName,
                email,
            });
            return res.status(200).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    static async changeUserPassword (req, res) {
        try {
            const { userId } = req;
            const { oldPassword, newPassword } = req.body;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const isMatch = await authService.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Incorrect password, please try again'
                });
            }
            const updatedhashedPassword = await authService.encryptPassword(newPassword);
            await userService.updateUser(userId, {
                password: updatedhashedPassword
            });
            return res.status(200).json({
                status: 'success',
                message: 'Password changed successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = userProfileController;