import { Schema, model, models } from 'mongoose'

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  prompt: {
    required: [true, 'prompt is required'],
    type: String,
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
})

export const PromptModel = models.prompt || model('prompt', promptSchema)
