const LocalStrategy = require('passport-local').Strategy;
const { AppDataSource } = require('../../src/data-source');
const userRepository = AppDataSource.getRepository('User');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await userRepository.findOne({ where: { email } });
    if (user == null)
      return done(null, false, { message: 'Utilisateur introuvable !' });
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Mot de passe incorrecte !' });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await userRepository.findOne({ where: { id } });
    return done(null, user);
  });
}

module.exports = initialize;
