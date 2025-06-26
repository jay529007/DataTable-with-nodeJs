import { Op } from "sequelize";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    let {
      page = 1,
      pageSize = 10,
      search = "",
      sortField = "id",
      sortOrder = "asc",

      // this is for "get" reqest Query string:
      // } = req.query;
    } = req.body;

    // force numbers
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;

    //  only allow known columns (white-list!)
    const allowedFields = ["id", "name", "email", "createdAt", "updatedAt"];
    if (!allowedFields.includes(sortField)) sortField = "id";

    //  asc/desc
    sortOrder = sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";

    const where =
      search.trim() === "" ? {} : { name: { [Op.like]: `%${search.trim()}%` } };

    const { rows, count } = await User.findAndCountAll({
      where,
      order: [[sortField, sortOrder]],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    res.json({ data: rows, total: count });
  } catch (err) {
    console.error("❌ getAllUsers failed:", err);
    res.status(500).json({ message: err.message });
  }
};
