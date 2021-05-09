import Head from 'next/head'
import { useUser,withPageAuthRequired } from '@auth0/nextjs-auth0'



export default withPageAuthRequired(function Profile() {
    const { user, error, isLoading } = useUser()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (user) {
        return (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
            </div>
        )
    }
});
