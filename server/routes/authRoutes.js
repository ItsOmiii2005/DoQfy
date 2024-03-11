const router = require('express').Router();

const authenticateJWT = require('../middleware/authMiddleware');
const authControllers = require('../controllers/authControllers');


router.post('/login', authControllers.login);
router.get('/logout',authControllers.logout);
router.post('/signup',authControllers.signup);

router.post('/loggedIn', authenticateJWT, authControllers.loggedin);

module.exports = router;
