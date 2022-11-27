import { Page } from 'puppeteer'


const LOGIN_PORTAL_ADDRESS = 'https://online.rvk.pset.fi/auth/realms/assari/protocol/openid-connect/auth?client_id=assari&redirect_uri=https://online.rvk.pset.fi/kirjaudu&response_type=code&scope=openid+email+profile'


export interface kcTokens {
    kcAccess: string
    kcState: string
}

export const authenticate = async (page: Page, username: string, password: string): Promise<any> => {
    return new Promise(async (res, _) => {

        await page.goto(LOGIN_PORTAL_ADDRESS);

        // Type credentials
        await page.type('#username', username)
        await page.type('#password', password)
        
        // Click login button

        await Promise.all([
            page.click('#kc-login'),
            page.waitForNavigation({waitUntil: 'networkidle2'})
        ])

        const cookies = await page.cookies()

        res(cookies)

    })
}
