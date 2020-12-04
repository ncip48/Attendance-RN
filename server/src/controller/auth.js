const { Worker, Position } = require("../../models");

//define the jwt
const jwt = require("jsonwebtoken");

//define the encryption
const bcrypt = require("bcrypt");

//import validator
const joi = require("@hapi/joi");

//import jwt_key from .env
const jwtKey = "AKUIMOETTS";

exports.checkAuth = async (req, res) => {
  try {
    const worker = await Worker.findOne({
      include: [
        {
          model: Position,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "positionId", "updatedAt", "password"],
      },
    });

    res.send({
      message: "Worker Valid",
      data: {
        worker,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    //get email and password from request body
    const { nrp, password } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      nrp: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check user in database based on email inputed
    const worker = await Worker.findOne({
      where: {
        nrp,
      },
    });

    //check if user existed with email inputed
    if (!worker) {
      return res.status(400).send({
        error: {
          message: "Username invalid",
        },
      });
    }

    //if user existed, check are the password same with compare input with database
    const validityPassword = await bcrypt.compare(password, worker.password);

    console.log(worker);

    //if password not same when compared then
    if (!validityPassword) {
      return res.status(400).send({
        error: {
          message: "Password invalid",
        },
      });
    }

    //if email and password match or valid then create token
    const token = jwt.sign(
      {
        id: worker.id,
      },
      jwtKey
    );

    //send response from login system
    res.send({
      message: "You has been successfully loged in!",
      data: {
        username: worker.username,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};
