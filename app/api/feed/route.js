import { PromptModel } from '@/models/prompt'

export const GET = async (req) => {
  try {
    const allFeeds = await PromptModel.find()
  } catch (err) {
    console.error(err)
  }
}
