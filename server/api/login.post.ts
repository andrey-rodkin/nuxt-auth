import { z } from 'zod'
import users from './users.json'
import crypto from 'crypto-js'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const md5 = (value: string): string => crypto.MD5(value).toString()

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse)

    const foundUser = users.find(
        ({credentials: {username, passphrase}}) => username === email && passphrase === md5(password)
    )

    if (foundUser) {
        const {credentials, _comment, ...user} = foundUser

        await setUserSession(event, {user})
        return {}
    }

    throw createError({
        statusCode: 401,
        message: 'Not authenticated'
    })
})