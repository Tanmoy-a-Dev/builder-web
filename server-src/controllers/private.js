
exports.getUser = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            userInfo: {
                id: req.user.id,
                name: req.user.username,
                email: req.user.email,
                role: req.user.role,
                profileImage: req.user.profileImage,
                permissions: req.user.permissions
            }
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: 'Couldn\'t collect data'
        })
    }
};