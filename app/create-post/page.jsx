'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Form } from '@/components/Form'

const CreatePost = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Calling api end point which we can build in api folder without need to create another express or any other api service
    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          ...post,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err.message)
      }

      console.log(res)

      const data = await res.json()

      console.log(data)

      router.push('/')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      {session?.user && (
        <Form
          type='create'
          onSubmit={handleSubmit}
          isSubmitting={submitting}
          post={post}
          setPost={setPost}
        />
      )}
    </>
  )
}

export default CreatePost
