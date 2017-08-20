import { User } from '../models/user';

// export function postPerson(req, res) {
//     res.json({ message: 'Person added to DB'});
// }

export class UserController {

  getUsers(req: Request, res) {
    User.find({}, (err, users) => {
      if(err) return res.send(err);
      res.json(users);
    });
  }

  getMyUser(req: Request, res) {
    User.findOne({_id: req.user._id})
        .select('-password -_id -__v')
        .exec((err, user) => {
          if(err) return res.send(500);
          return res.json(user);
    });
  }

  getUserData(req, res) {
    let id = req.params.user_id;
    User.findOne({ id: id })
        .select('-password')
        .exec((err, user) => {
          if(err) return res.send(err);
          res.json(user);
        });
  }

  postUser = function(req,res) {
    let user = new User({
      id: req.body.id,
      password: '1234',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      mail: req.body.mail,
    });

    user.save((err) => {
      if(err) return res.send(err);
      res.json({message: 'New user created!' });
    })
  }
}

