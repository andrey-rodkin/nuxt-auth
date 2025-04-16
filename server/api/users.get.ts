import users from './users.json'

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    return users.map(({credentials: {username: email}, _comment, ...user}) => ({...user, email: email}))
})