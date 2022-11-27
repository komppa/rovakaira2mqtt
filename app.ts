import dotenv from 'dotenv'
import { authenticate } from './auth'
import { getMonthlyUsage } from './api'
import puppeteer from 'puppeteer'


dotenv.config()


/**
 * Just a example how RVK API can be used
 */
const app = async () => {

    // Get credentials from the env file
    const username = process.env.RVK_USERNAME
    const password = process.env.RVK_PASSWORD

    // Create new headless browser for logging in
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Check whether they are defined
    if (
        username === undefined ||
        password === undefined
    ) {
        console.error('Username and/or password not defined in .env file! Exiting.')
        return
    }
    
    // Get kc-access & kc-state tokens - authenticate
    const session: any = await authenticate(
        page,
        username,
        password
    )
        
    const monthUsage = await getMonthlyUsage(
        page,
        process.env.RVK_METER_NAME || '',
        {
            start: '2022-01-01',
            end: '2022-12-31',
        }
    )

    console.log(monthUsage) // [ { ts: '2022-31-01T21:00:00.000Z', v: 482.81 }, ... ]

    await browser.close()

}


app()