const { hashSync, compareSync, genSaltSync } = require('bcrypt');

const saltRounds = 10;

const genSalt = () => {
    return genSaltSync(saltRounds);
};

const hash = (password) => {
    return hashSync(password, genSalt());
};

const compare = (enteredPassword, currentPassword) => {
    return compareSync(enteredPassword, currentPassword);
};

module.exports = {
    genSalt,
    hash,
    compare
};
