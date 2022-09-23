const { models } = require("mongoose");


module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Charles M. Wolfe'
        });
    }
}
