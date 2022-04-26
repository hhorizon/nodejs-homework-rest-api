const authService = require("../../services/auth");
const { HttpCode } = require("../../libs/constants");

const login = async (req, res) => {
  const { token, email, subscription } = await authService.login(req.body);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { token, user: { email, subscription } },
  });
};

module.exports = login;