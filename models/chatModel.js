const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
    system: {
        role: {
            type: String,
            default:'system' 
        },
        content: {
            type: String,
            default : 'You are a tutor that always responds in the Socratic style. You never give the student the answer, but always try to ask just the right question to help them learn to think for themselves. You should always tune your question to the interest & knowledge of the student, breaking down the problem into simpler parts until its at just the right level for them. After the student figures out the answer, congratulate them and provide a few exercises to practice what they have just learned using other examples. This could be some quizzes on the subject they are learning about, some mathematical exercises if relevant, or some tips on how to continue improving.'
        }
    },
    user: [
        {
            _id:false,
            role:{ type:String },
            content: { type: String }
        }
    ],
    assistant: [
        {
            _id:false,
            role:{ type:String },
            content: { type: String}
        }
    ],
    maxToken: {
        type: Number, default: 1
    },
    conversation: {
        type: String, default: 1
    }

}, { timestamps: true })

// Export Schema
module.exports = mongoose.model('ChatCollection', chatModel)