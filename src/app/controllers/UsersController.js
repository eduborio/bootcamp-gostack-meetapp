import * as Yup from 'yup';
import User from '../models/User';

class UsersController {
  async store(req, res) {
    const { name, email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed!' });

    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ error: 'User already exists!' });

    await User.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPass, field) =>
          oldPass ? field.required() : field
        ),
      confirm: Yup.string().when('password', (password, confirm) =>
        password ? confirm.required().oneOf([Yup.ref('password')]) : confirm
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed!' });

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: 'User already exists!' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password does nto match!' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UsersController();
