const managementAccount = require("$services/function/managementAccount");
const yup = require("yup");

const getUser = async (req, res) => {
  try {
    const { uuid, action } = req.params;
    const schema = yup.object().shape({
      uuid: yup.string().uuid().required(),
      action: yup.string().required(),
    });
    try {
      await schema.validate({ uuid: uuid, action: action });

      if (action == "active") {
        if (await managementAccount.activeAccount(uuid)) {
          return res.status(200).json({
            message: "compte utilisateur activer",
          });
        }
      } else if (action == "disable") {
        if (await managementAccount.disableAccount(uuid)) {
          return res.status(200).json({
            message: "compte utilisateur désactiver",
          });
        }
      } else if (action == "banish") {
        if (await managementAccount.banishAccount(uuid)) {
          return res.status(200).json({
            message: "compte utilisateur bannies",
          });
        }
      } else if (action == "suspend") {
        if (await managementAccount.suspendAccount(uuid)) {
          return res.status(200).json({
            message: "compte utilisateur suspendu",
          });
        }
      }
      return res.status(404).json({
        message: "Bad Request",
        errors: "action non reconnus",
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        message: "Bad Request",
        errors: schema.errors,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send("Server Error");
  }
};

module.exports = getUser;
