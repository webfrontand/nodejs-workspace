import User from '../models/user';
import passportError from './passportError';
import { generateHash } from '../helpers/bcrypt';

export default function(passport, FacebookStrategy, LocalStrategy, config){
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      })
    });

    passport.use(new FacebookStrategy({
      clientID: config.appID,
      clientSecret: config.appSecret,
      callbackURL: config.callbackURL,
      profileFields: config.profileFields
    },
    (access_token, refresh_token, profile, done) => {
      User.findFacebookId(profile.id)
      .then(
        (user) => {
          // user is found
          if(user) {
            done(null, user);
            return;
          } else {
            const newUser = new User({
              type: 'facebook',
              common_profile: {
                username: profile.displayName,
                email: profile.emails ? (profile.emails.length > 0 ? profile.emails[0].value : null) : null
              },
              o_auth: {
                facebook: {
                  id: profile.id,
                  access_token
                }
              }
            })

            return newUser.save();
          }
        }
      ).then(
        (user) => {
          if(!user) return;
          return done(null, user);
        }
      )
    }));

    passport.use(
      'local-register',
      new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
          User.findUsername(username).then(
            (user) => {
              if(user) {
                throw new passportError(1, "user exists");
              } else {
                return generateHash(password);
              }
            }
          ).then(
            (hash) => {
              const user = new User({
                type: 'local',
                common_profile: {
                  username: username,
                  password: hash
                }
              });

              return user.save();
            }
          ).then(
            (user) => {
              return done(null, user)
            }
          ).catch(
            (error) => {
              done(error);
            }
          )
        }))

}




// User.findOne({'o_auth.facebook.id': profile.id}, (err, user) => {
//   if(user){
//     done(null, user);
//   } else {
//     const newUser = new User({
//       type: 'facebook',
//       commont_profile: {
//         username: profile.displayName,
//         email: profile.emails ? (profile.emails.length > 0 ? profile.emails[0].value : null) : null
//       },
//       o_auth: {
//         facebook: {
//           id: profile.id,
//           access_token
//         }
//       }
//     })
//
//     newUser.save((err) => {
//       done(null, user);
//     });
//   }
// })
