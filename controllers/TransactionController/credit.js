const db = require("$db");

const credit = async (req, res) => {
    console.log(req.body)

    const { uuid , solde } = req.body;




     await  db.account.update({
        where: {
          uuid: uuid,
        },
        data: {
          solde:  solde,
        },
      });
    
    return  res.status(200).json({
        message : 'ok'})

  
  
};

module.exports = credit;
