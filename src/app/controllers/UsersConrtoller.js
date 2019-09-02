import User from '../models/User';

class UsersController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists)
      return res.status(400).json(`User already exists! ${req.body.email}`);

    const user = await User.create(req.body);

    return res.json({ name: user.name, email: user.email });
  }
}

export default new UsersController();
