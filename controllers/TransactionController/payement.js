const db = require("$db");
const { decryptCard } = require("$services/function/utile");
const yup = require("yup");
const bcrypt = require("bcrypt");
const process_payement = require("$services/bancaire/payement");
const pushNotification = require("$services/system/notification/pushNotification");
const payement = async (req, res) => {
  /**
   * on verifie que l'action (donner encryper est bien renseigner)
   */
  action = req.body.action;
  try {
    const schema = yup.object().shape({
      action: yup.string().required(),
    });
    if (!(await schema.validate({ action: action }))) {
      return res.status(400).json({
        message: "Bad Request",
        errors: schema.errors,
      });
    }

    /**
     * decryptage de la data
     */
    let decrypt = decryptCard(action);

    console.log("result decriptage ; ",decrypt)

    /**
     * recuperation de la data liee a la carte
     */
    let dataDebiter = await db.cards.findUnique({
      where: {
        uuid: decrypt.idcard,
      },
    });

    console.log("data debiteur",dataDebiter)


    /**
     * recuperation du compte pro crediteur
     * si l'utilisateur ne possède pas de compe pro il n'est pas sencer pour effectuer des encaissements
     */

    const dataCrediteur = await db.account.findMany({
      where: { user_uuid: req.user, type: "pro" },
      include: {
        user: true,
      },
    });
    console.log("data ",dataCrediteur)
    if (!dataCrediteur.length) {
      return res.status(401).json({
        message: "payement refuser",
      });
    }

    /**
     * si tout est bon on efffectue le payement
     */
    process_payement(
      {
        from: dataDebiter.account_uuid,
        to: dataCrediteur[0].uuid,
        amount: decrypt.amount,
      },
      req.user
    )
      .then((response) => {
        console.log("payement accepted");
        pushNotification(
          {
            sound: "default",
            body: `votre payement de ${decrypt.amount} kmf a était accepter 💸 `,
            title: "mes comptes riale-online",
          },
          dataDebiter.user_uuid
        );
        return res.status(201).json({
          message: "le payement  bien éffectuer",
        });
      })
      .catch((e) => {
        console.log("payement refuser");
        pushNotification(
          {
            sound: "default",
            body: `votre payement de ${decrypt.amount} kmf a était refuser ❌`,
            title: "mes comptes riale-online",
          },
          dataDebiter.user_uuid
        );
        return res.status(400).json({
          message: e,
        });
      });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

module.exports = payement;
