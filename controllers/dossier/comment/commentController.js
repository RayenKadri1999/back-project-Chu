import mongoose from "mongoose";

export const getCommentsController = async (modelName, req, res, next) => {
  try {
    const Model = mongoose.model(modelName);
    const { idEntity } = req.params;

    const entity = await Model.findOne({ matricule: idEntity })
      .populate("reviewInfo.comments.createdBy", "username email");
    
    if (!entity) {
      return res.status(404).json({ success: false, message: `${modelName} not found` });
    }

    res.status(200).json({
      success: true,
      comments: entity.reviewInfo.comments || [],
    });
  } catch (err) {
    next(err);
  }
};

export const addCommentController = async (modelName, req, res, next) => {
  try {
    const Model = mongoose.model(modelName);
    const { message } = req.body;
    const {idEntity} = req.params;
    const userId = req.userId; 

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const entity = await Model.findOne({ matricule: idEntity });
    if (!entity) {
      return res.status(404).json({ success: false, message: `${modelName} not found` });
    }

    const comment = {
      createdBy: userId,
      message,
      createdAt: new Date(),
    };

    entity.reviewInfo.comments.push(comment);
    await entity.save();

    await entity.populate("reviewInfo.comments.createdBy", "username email");

    const newComment = entity.reviewInfo.comments[entity.reviewInfo.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (err) {
    next(err);
  }
};


export const updateCommentController = async (modelName, req, res, next) => {
  try {
    const Model = mongoose.model(modelName);
    const { message } = req.body;
    const { idEntity, commentId } = req.params;
    const userId = req.userId;

    if (!userId) 
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // Validate ObjectId formats
    // Validate comment ObjectId format
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: "Invalid comment ID format" });
    }

    const entity = await Model.findOne({ matricule: idEntity });
    if (!entity) 
      return res.status(404).json({ success: false, message: `${modelName} not found` });

    // Find the comment by _id in the nested array
    const commentIndex = entity.reviewInfo.comments.findIndex(
      c => c._id.toString() === commentId
    );
    if (commentIndex === -1) 
      return res.status(404).json({ success: false, message: "Comment not found" });

    const comment = entity.reviewInfo.comments[commentIndex];

    if (!comment.createdBy.equals(userId)) {
      return res.status(403).json({ success: false, message: "You can only edit your own comment" });
    }

    // Update the comment
    comment.message = message;
    comment.updatedAt = new Date();

    // Save the entity
    await entity.save();

    await entity.populate("reviewInfo.comments.createdBy", "username email");

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteCommentController = async (modelName, req, res, next) => {
  try {
    const Model = mongoose.model(modelName);
    const { idEntity, commentId } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    // Validate comment ObjectId format
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ success: false, message: "Invalid comment ID format" });
    }

    const entity = await Model.findOne({ matricule: idEntity });
    if (!entity) return res.status(404).json({ success: false, message: `${modelName} not found` });

    const comment = entity.reviewInfo.comments.find(c => c._id.toString() === commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    if (!comment.createdBy.equals(userId)) {
      return res.status(403).json({ success: false, message: "You can only delete your own comment" });
    }

    // Remove the comment using filter
    entity.reviewInfo.comments = entity.reviewInfo.comments.filter(c => c._id.toString() !== commentId);
    await entity.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      commentId,
    });
  } catch (err) {
    next(err);
  }
};

