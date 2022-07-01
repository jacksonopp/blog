import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'


type Props = {}

const AdminPage = (props: Props) => {
  const router = useRouter()
  // // useAuthRedirect('/', { role: 'superadmin', router })

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/')
    }
  })

  // a use effect that redirects to the home page if the user is not a superadmin
  useEffect(() => {
    if (session?.role !== 'superadmin') {
      // router.push('/');
      router.replace('/');
    }
  }, [session])

  // if the user is not a superadmin, render a redirecting message
  if (session?.role !== 'superadmin') {
    return (
    // a card in the middle of the page that says redirecting
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold mb-4">
            Redirecting...
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div>AdminPage</div>
  )
}

export default AdminPage