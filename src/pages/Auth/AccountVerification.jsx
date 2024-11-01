import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])
  const [verified, setVerified] = useState(false)

  // api verify
  useEffect(() => {
    if (email && token)
    {
      verifyUserAPI({ email, token }).then(() => { setVerified(true) })
    }
  }, [email, token])

  // url khong du email, token thi => 404 page
  if (!email || !token) return <Navigate to='/404' />

  // in verify process thi hien loading
  if (!verified) return <PageLoadingSpinner caption='Verifying your account...' />

  // neu success => login page + verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification