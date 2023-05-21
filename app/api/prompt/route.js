import { connectToDB } from '@/models/database'
import { PromptModel } from '@/models/prompt'

export const POST = async (req) => {
  try {
    const { userId, prompt, tag } = await req.json()

    // First connecting to database because below function is a labmda function which means connection will die after the execution is done
    await connectToDB()

    const newPrompt = new PromptModel({
      creator: userId,
      tag,
      prompt,
    })

    await newPrompt.save()

    const response = {
      status: 'Success✅',
      statusCode: 201,
      prompt: {
        newPrompt,
      },
    }

    // in order to send data in next we return a new Response object
    return new Response(JSON.stringify(response), {
      status: 201,
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ message: 'Some thing went wrong' }), {
      status: 500,
      statusText: 'Internal server error',
    })
  }
}
