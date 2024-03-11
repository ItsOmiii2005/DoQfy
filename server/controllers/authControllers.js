

const cookie = require('cookie');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_ENCRYPTION_KEY;

const authControllers = {

    signup:
    async (req, res) => {
        const { name,
            email,
            password, } = req.body;

            console.log(name, email, password);

        try {
            
            const newUser = new User({
                name,
                email,
                password,
            });
            await newUser.save();
            res.json(newUser);

        }catch(error){
            console.log(error);
        }
    },
login:
async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                // Create a payload for the JWT token with user information
                const payload = {
                    username: user.name,
                    name: user.name,
                };
// console.log(payload);
                // Generate a JWT token and send it to the client
                const token = jwt.sign(payload, secretKey, { expiresIn: '100m' });
                console.log('Generated Token:', token);

                // Set the JWT token as a cookie
                res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                    httpOnly: true,
                    maxAge: 60 * 100, // 10 minutes
                    sameSite: 'strict', // Adjust this based on your security requirements
                    path: '/', // Specify the path where the cookie is accessible
                }));

                // Respond with any other necessary data
                res.json({ name: user.name, role: user.role });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } else if (user === 'Admin' && password === 'Admin') {
            // Hardcoded user for fallback authentication
            // Create a payload for the JWT token with user information
            const payload = {
                username: user,
                name: 'Admin',
            };

            // Generate a JWT token and send it to the client
            const token = jwt.sign(payload, secretKey, { expiresIn: '100m' });
            console.log('Generated Token:', token);

            // Set the JWT token as a cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 60 * 100, // 100 minutes
                sameSite: 'strict', // Adjust this based on your security requirements
                path: '/', // Specify the path where the cookie is accessible
            }));

            // Respond with any other necessary data
            res.json({ name: 'Hardcoded User' });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
},

loggedin:
(req, res) => {
    console.log(req.user.role);
      // Serve the dashboard content here
      const userData = {
          name: req.user.username, // Replace with the actual user's name
          email: 'omanandswami@2005.com',
          role: req.user.role // Replace with the actual user's email
      };
  
      res.json({ data: true, userData});
  },
  logout:
  (req, res) => {
    // Clear the token cookie by setting it to an empty value and specifying an immediate expiration time
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        maxAge: 0, // Set the cookie to expire immediately
        sameSite: 'strict', // Adjust this based on your security requirements
        path: '/', // Specify the path where the cookie was originally set
    }));

    res.json({ logout: false }).sendStatus(200);
},

}


module.exports = authControllers;