import Link from 'next/link'

export const Form = ({ type, onSubmit, isSubmitting, post, setPost }) => {
  let ongoingStr = type === 'create' ? `creating` : ''
  ongoingStr = type === 'edit' ? `editing` : ongoingStr

  return (
    <>
      <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient capitalize'> {type} Post</span>
        </h1>

        <p className='desc max-w-md'>
          Create and share amazing prompts with the world and let your
          imagination run wild with any AI poweered platform
        </p>
        <form
          onSubmit={onSubmit}
          className='mt-6 flex flex-col max-w-2xl w-full gap-7 glassmorphism'>
          <label htmlFor='prompt' className='text-xl text-gray-900 '>
            <span className='font-semibold text-base text-gray-700 font-satoshi capitalize'>
              Your AI prompt
            </span>

            <textarea
              id='prompt'
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              className='form_textarea resize-none'
              placeholder='Write your prompt here'
            />
          </label>

          <label htmlFor='tags' className='text-xl text-gray-900 '>
            <span className='font-semibold text-base text-gray-700 font-satoshi capitalize'>
              Tags{' '}
              <span className='text-sm text-gray-400 font-medium'>
                (Ex: #webdevelopement, #AI, #coding)
              </span>
            </span>

            <input
              id='tags'
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              className='form_input'
              placeholder='#tags'
            />
          </label>

          <div className='flex items-center flex-end gap-4'>
            <Link href='/' className='text-gray-500 font-sm'>
              Cancel
            </Link>
            <button
              type='submit'
              disabled={isSubmitting}
              className='py-1.5 text-sm bg-primary-orange text-white rounded-full px-5 font-medium capitalize disabled:cursor-not-allowed disabled:opacity-80'>
              {isSubmitting ? `${ongoingStr}...` : type}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
