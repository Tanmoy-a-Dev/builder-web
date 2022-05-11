// importing required packages
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Duplicate Username"
            },
            validate: {
                len: {
                    args: [2, 10],
                    msg: "Username must be between 2 to 10 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Duplicate Email"
            },
            validate: {
                notEmpty: {
                    msg: "Please enter an email",
                },
                // isEmail: {
                //     args: true,
                //     msg: "Please enter a valid email"
                // }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required"
                },
                len: {
                    args: [6, 200],
                    msg: "Password should be minimum 6 characters long "
                }
            }
        },
        profileImage: DataTypes.STRING,
        loggedIn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cloudinaryId: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        permissions: {
            type: DataTypes.TEXT,
            allowNull: true,
            get: function () {
                return JSON.parse(this.getDataValue('permissions'));
            },
            set: function (val) {
                return this.setDataValue('permissions', JSON.stringify(val));
            }
        },
        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpire: DataTypes.DATE
    },
        {

            hooks: {
                beforeSave: async function (user) {
                    if (!user.changed("password")) {
                        return;
                    }
                    else {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }

                }
            },
            sequelize
        }
    );

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);

    };

    // get a signed token
    User.prototype.getSignedToken = function () {
        return jwt.sign({ id: this.id }, process.env.JWT_KEY, { expiresIn: '120m' })
    }

    // get a reset token
    User.prototype.getResetToken = function () {
        const resetToken = crypto.randomBytes(20).toString("hex");

        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

        return resetToken;
    }

    return User;
}

