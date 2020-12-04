const { Position } = require("../../models");

exports.getPosition = async (req, res) => {
  try {
    const positions = await Position.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Position loaded successfully",
      data: {
        positions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
