import jwt from 'jwt-simple';
import User from '../models/user_model';
import config from '../config';


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  return undefined;
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

// :
// here you should do a mongo query to find if a user already exists with this email.
// if user exists then return an error. If not, use the User model to create a new user.
// Save the new User object
// this is similar to how you created a Post
// and then return a token same as you did in in signin

  User.find({ email }).then(response => {
    res.status(422).send('already has an email');
    return;
  });

  const newUser = new User();
  newUser.email = email;
  newUser.password = password;
  newUser.save()
  .then(result => {
    res.send({ token: tokenForUser(newUser) }); // return user token
  })
  .catch(err => {
    res.json(err);
  });
  return undefined;
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
