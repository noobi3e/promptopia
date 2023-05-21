'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // function to getProviders [this will give us the list of auth provider which we will congiure using next-auth]
    const getAllProviders = async () => {
      const res = await getProviders()

      setProviders(res)
    }

    getAllProviders()
  }, [])

  return (
    <>
      <nav className='py-4 flex w-full items-center justify-between px-4 mb-16'>
        <Link href={'/'} className='flex gap-2 flex-center'>
          <Image
            alt='promptopia logo'
            src='/assets/images/logo.svg'
            width={40}
            height={40}
          />
          <h2 className='logo_text'>Promptopia</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
          {/* if user is logged in */}
          {session?.user && (
            <div className='flex items-center gap-2'>
              <button className='black_btn' onClick={signOut}>
                Sign Out
              </button>
              <Link href={'create-post'} className='outline_btn'>
                Create Post
              </Link>
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                alt='user profile picture'
                className='rounded-full'
              />
            </div>
          )}

          {/* no user is logged in */}
          {!session?.user && (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'>
                      Sign In
                    </button>
                  )
                })}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
          <AnimatePresence mode='wait'>
            {session?.user && (
              <div className='flex'>
                <Image
                  src={session?.user.image}
                  width={40}
                  height={40}
                  alt='user profile picture'
                  onClick={() => setShowDropdown((lst) => !lst)}
                  className='rounded-full cursor-pointer'
                />

                {showDropdown && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50 }}
                    className='dropdown drop-shadow-md'>
                    <Link
                      href={'/profile'}
                      onClick={() => setShowDropdown(false)}
                      className='dropdown_link'>
                      My Profile
                    </Link>
                    <Link
                      href={'/create-post'}
                      onClick={() => setShowDropdown(false)}
                      className='dropdown_link'>
                      Create Prompt
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setShowDropdown(false)
                        signOut()
                      }}
                      className='black_btn w-full mt-5'>
                      Sign Out{' '}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
          {!session?.user && (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'>
                      Sign In
                    </button>
                  )
                })}
            </>
          )}
        </div>
      </nav>
    </>
  )
}
