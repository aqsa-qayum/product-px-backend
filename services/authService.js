const ResponseHelper = require('../utils/responseUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/index');
const sequelize = require('../config/database');

const secretString = "productpx1@1";

const login = async (req, res) => {
    let response = ResponseHelper.getResponse(
        false,
        'Something went wrong',
        {},
        400
    );
    const t = await sequelize.transaction();
    try {
        const { email, password } = req.body;
            const user = await models.User.findOne({
                where: { email: email, user_type: 'admin' },
            });
            if (user) {
                const verifyPassword = bcrypt.compareSync(password, user.password);
                if (verifyPassword == false) {
                    if (user.is_verified == 0) {
                        response.message = MessageHelper.getMessage(
                            'account_not_verified_message',
                            language
                        );
                    } else {
                        const token = jwt.sign(
                            { email: user.email },
                            secretString,
                            { expiresIn: '1h' }
                        );
                        const user_data = {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            token: token,
                            created_at: user.created_at,
                            updated_at: user.updated_at,
                        };
                        response.success = true;
                        response.message = "Login successfully.";
                        response.data = admin_user;
                        response.status = 200;
                    }
                }
            }
    } catch (err) {
        await t.rollback();
        response.message = "An exception error occured.";
        response.status = 500;
    } finally {
        return res.status(response.status).json(response);
    }
}

module.exports = {login, getUser}