import users from './users.json'

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    return users.map(({credentials, _comment, ...user}) => user)
})