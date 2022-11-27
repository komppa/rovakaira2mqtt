import puppeteer from 'puppeteer'


const LOGIN_PORTAL_ADDRESS = 'https://online.rvk.pset.fi/auth/realms/assari/protocol/openid-connect/auth?client_id=assari&redirect_uri=https://online.rvk.pset.fi/kirjaudu&response_type=code&scope=openid+email+profile'


export interface kcTokens {
    kcAccess: string
    kcState: string
}

export const authenticate = async (username: string, password: string): Promise<kcTokens> => {

    // Create new headless browser for logging in
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    await page.goto(LOGIN_PORTAL_ADDRESS);

    // Type credentials
    await page.type('#username', username)
    await page.type('#password', password)
    
    // Click login button
    await page.click('#kc-login')

    const cookies = await page.cookies()

    // Get tokens from cookies
    const kcState = cookies.filter((c: any) => c.name === 'kc-state')[0].value
    const kcAccess = cookies.filter((c: any) => c.name === 'kc-access')[0].value

    await browser.close()

    return {
        kcAccess,
        kcState
    }

}
