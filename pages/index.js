import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>P4</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
      Welcome To P4 Games
        </>
      )}

      {user && (
        <>
          <img src={user.picture} alt="user picture" />
          <p>Nickname: {user.nickname}</p>
          <p>Name: {user.name}</p>
        </>
      )}
    </Layout>
  )
}

export default Home
