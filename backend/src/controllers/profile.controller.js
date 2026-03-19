import { Education, Experience, Profile, User } from "../models/index.js";
import convertDataToPdf from "../services/convertDataToPdf";
import ExpressError from "../utils/expressError.js";

export const profile = async (req, res, next) => {
  const { user } = req;
  const userData = await User.findByPk(user.user_id, {
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Profile,
      as: "profile",
      include: [
        { model: Experience, as: "experiences" },
        { model: Education, as: "educations" },
      ],
    },
  });

  res.status(200).json({ user: userData });
};

export const updateProfile = async (req, res, next) => {
  const { username, experience, education } = req.body;
  const userId = req.user.user_id;

  let avatar_url = req.user.avatar_url;

  const file = req.file;
  if (file) {
    try {
      avatar_url = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
    } catch {
      return next(new ExpressError("Upload failed!", 500));
    }
  }

  const [rowsAffected, updatedUser] = await User.update(
    {
      avatar_url: avatar_url,
      username: username,
    },
    {
      where: { user_id: userId },
      attributes: { exclude: ["password"] },
      returning: true,
      plain: true,
    },
  );

  if (rowsAffected === 0) {
    return next(new ExpressError("User not found or no changes made", 404));
  }

  const profile = await Profile.findOne({ user_id: userId });

  let newExperience, newEducation;

  if (experience) {
    newExperience = await Experience.upsert({
      ...experience,
      profile_id: profile.id,
      where: { profile_id: profile.id },
    });
  }

  if (education) {
    newEducation = await Education.upsert({
      ...education,
      profile_id: profile.id,
      where: { profile_id: profile.id },
    });
  }

  return res.status(200).json({
    message: "Profile Updated successfuly!",
    user: updatedUser,
    newExperience,
    newEducation,
  });
};

export const downloadResume = async (req, res, next) => {
  const userData = await User.findByPk(req.user.user_id, {
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Profile,
      as: "profile",
      include: [
        { model: Experience, as: "experiences" },
        { model: Education, as: "educations" },
      ],
    },
  });

  const outputPath = await convertDataToPdf(userData);

  return res.status(200).json({message: outputPath});
};
