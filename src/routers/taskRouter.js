import express from "express";
import {
  deleteManyTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/task/TaskModel.js";
const router = express.Router();

// router.all("/", (req, res, next) => {
//   // console.log("got hit to all");
//   next();
// });

router.get("/", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json({
      status: "success",
      message: "List of the tasks",
      tasks,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //run the db query to add to db

    const result = await insertTask(req.body);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The new task has been added",
      });
    }
    res.json({
      status: "error",
      message: "unable to add the task, try again later",
    });
  } catch (error) {
    error.code = 500;

    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { _id, type } = req.body;
    //upate
    const task = await updateTask(_id, type);

    if (task?._id) {
      return res.json({
        status: "success",
        message: "The task has been switechecd",
      });
    }

    res.json({
      status: "error",
      message: "Unable to switch the task, try agian later",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// use this method for single item to delete
// router.delete("/:_id", (req, res, next) => {

//this approach for multiple item to delete
router.delete("/", async (req, res, next) => {
  try {
    const _idArg = req.body;
    console.log(_idArg);

    //replace following code by calling db module
    const result = await deleteManyTask(_idArg);

    if (result?.deletedCount) {
      return res.json({
        status: "success",
        message: "Deleted successfully",
      });
    }

    res.json({
      status: "error",
      message: "Unable to Deleted, try again later",
    });
  } catch (error) {
    error.code = 500;
    next(error);
  }
});
export default router;
