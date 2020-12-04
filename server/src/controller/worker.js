const { Worker, Position } = require("../../models");

exports.getWorker = async (req, res) => {
  try {
    const workers = await Worker.findAll({
      include: [
        {
          model: Position,
          as: "position",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "positionId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Worker loaded successfully",
      data: {
        workers,
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
