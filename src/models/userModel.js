'use strict';

const getUserLogin = async (user) => {
    try {
      console.log('getUserLogin()', user);
      const [rows] = await promisePool.execute(
          'SELECT * FROM user WHERE username = ?',
          user);
      return rows;
    } catch (e) {
      console.log('error', e.message);
      res.status(500).send(e.message);
    }
};

module.exports = {
    getUserLogin
}