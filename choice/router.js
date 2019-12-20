const { Router } = require("express");
const User = require("../signup/model");
const GameRoom = require("../gameroom/model");

function factory(stream) {
  const router = new Router();
  router.put("/choice", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.body.userId);
      console.log("user test:", user);
      await user.update({ choice: req.body.choice });

      const gameroom = await GameRoom.findByPk(user.gameroomId, {
        include: [User]
      });
      const every = gameroom.users.every(user => user.choice !== null);
      const usersInGame = gameroom.users;
      const player1 = usersInGame[0];
      const player2 = usersInGame[1];
      console.log("player1", player1);
      console.log("player2", player2);

      if (player1.choice === null || player2.choice === null) return;

      if (every) {
        if (player1.choice === player2.choice && player1.choice) {
          console.log("both cooperate test");
          player1.points += 1;
          player2.points += 1;
        } else if (player1.choice === player2.choice && !player1.choice) {
          console.log("both defect test");
          player1.points += 2;
          player2.points += 2;
        } else if (player1.choice && !player2.choice) {
          console.log("1 cooperates 2 defects");
          player1.points += 3;
        } else if (!player1.choice && player2.choice) {
          console.log("1 defects 2 cooperates");
          player2.points += 3;
        }
      }

      console.log("player1points", player1.points);
      await User.update(
        { points: player1.points },
        {
          where: {
            id: player1.id
          }
        }
      );
      console.log("player2points", player2.points);

      await User.update(
        { points: player2.points },
        {
          where: {
            id: player2.id
          }
        }
      );

      const gameroomsUpdated = await GameRoom.findAll({
        include: [User]
      });

      const action = {
        type: "ALL_GAMEROOMS",
        payload: gameroomsUpdated
      };
      const string = JSON.stringify(action);
      stream.send(string);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
