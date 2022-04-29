const jwt = require("jsonwebtoken");
const Users = require("../../repository/users");
const { CustomError } = require("../../middlewares/error-handler");
const { HttpCode } = require("../../libs/constants");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);

    if (user) {
      throw new CustomError(HttpCode.CONFLICT, "Email in use");
    }

    const newUser = await Users.create(body);

    return {
      email: newUser.email,
      subscription: newUser.subscription,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);

    if (!user) {
      throw new CustomError(
        HttpCode.UNAUTHORIZED,
        "Email or password is wrong"
      );
    }

    const token = this.generateToken(user);
    await Users.updateToken(user.id, token);

    const { subscription } = user;

    return { token, email, subscription };
  }

  async logout(id) {
    const user = await Users.findById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    await Users.updateToken(id, null);
  }

  async current(id) {
    const user = await Users.findById(id);

    if (!user) {
      throw new CustomError(HttpCode.UNAUTHORIZED, "Not authorized");
    }

    const { email, subscription } = user;

    return { email, subscription };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!(await user?.isValidPassword(password))) {
      return null;
    }

    return user;
  }

  generateToken(user) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    return token;
  }
}

module.exports = new AuthService();
