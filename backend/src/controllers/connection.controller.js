import { Op } from "sequelize";
import { Connection, User } from "../models/index.js";
import ExpressError from "../utils/expressError.js";

export const sendConnectionRequest = async (req, res, next) => {
  const senderId = req.user.user_id;
  const { reciverId } = req.params;

  const reciver = User.findByPk({where: {user_id: reciverId}});

  if(!reciver){
    return next(new ExpressError("User not found!", 400));
  }

  if (senderId === reciverId) {
    return next(new ExpressError("You cannot connect with yourself.", 400));
  }

  const existingConnection = await Connection.findOne({
    where: { sender_id: senderId, reciver_id: reciverId },
  });

  if (existingConnection) {
    return next(new ExpressError("Connection Already exist!", 400));
  }

  await Connection.create({ sender_id: senderId, reciver_id: reciverId });

  return res
    .status(200)
    .json({ message: "Connection request sent successfully!" });
};

export const respondToRequest = async (req, res, next) => {
  const { response, requestId } = req.body;

  const existingConnection = await Connection.findByPk({
    where: { id: requestId},
  });

  if (!existingConnection) {
    return next(
      new ExpressError("Connection request not found or already handled!", 400),
    );
  }

  await existingConnection.update({ status: response });

  return res
    .status(200)
    .json({ message: `You ${response} this friend request!` });
};

export const getPendingRequests = async (req, res, next) => {
  const myId = req.user.user_id;

  const allPendingRequests = await Connection.findAll({
    where: { reciver_id: myId, status: "pending" },
    include: {
      model: User,
      as: "sender",
    },
  });

  res.status(200).json({ data: allPendingRequests });
};

export const getMyRequest = async(req, res, next)=>{
  const senderId = req.user.user_id;

  const connection = await Connection.findAll({where: {sender_id: senderId}});

  return res.status(200).json({data: connection});
}

export const getMyNetwork = async (req, res, next) => {
  const user_id = req.user.user_id;
  const AllConnection = await Connection.findAll({
    where: {
      status: "accepted",
      [Op.or]: [{ sender_id: user_id }, { reciver_id: user_id }],
    },
    include: [
      {
        model: User,
        as: "reciver",
        attributes: ["username", "avatar_url", "user_id"],
      },
      {
        model: User,
        as: "sender",
        attributes: ["username", "avatar_url", "user_id"],
      },
    ],
  });

  res.status(200).json({ data: AllConnection });
};
