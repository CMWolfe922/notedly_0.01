module.exports = {
    // Resolve the list of notes for a user when requested
    notes: async (user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({ _id: -1 });
    },

    // Resolve the favoritedBy info for a note when requested
    favorites: async (user, args, { models }) => {
        return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
};
