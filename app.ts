import dotenv from 'dotenv'
import { kcTokens, authenticate } from './auth'


dotenv.config()


/**
 * Just a example how RVK API can be used
 */
const app = async () => {

    // Get credentials from the env file
    const username = process.env.RVK_USERNAME
    const password = process.env.RVK_PASSWORD

    // Check whether they are defined
    if (
        username === undefined ||
        password === undefined
    ) {
        console.error('Username and/or password not defined in .env file! Exiting.')
        return
    }

    // Get kc-access & kc-state tokens - authenticate
    const tokens: kcTokens = await authenticate(
        username,
        password
    )

    



}


app()