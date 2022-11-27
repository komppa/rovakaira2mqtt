import { Page } from 'puppeteer'


const ROVAKAIRA_HOST = 'https://online.rvk.pset.fi'


interface TimePeriod {
    start: string
    end: string
}


export const getMonthlyUsage = async (page: Page, meterName: string, timePeriod: TimePeriod) => {
    return new Promise(async (res, _) => {

        const endpoint = '/api/electricity/month'

        // For time period for instance: start: 2022-01-01, end: 2022-12-31
        // For meter name for instance RVK000_1234657
                                       
        await page.goto(
            `${ROVAKAIRA_HOST}/sahko/${meterName}?start=${timePeriod.start}&end=${timePeriod.end}&frame=year&level=month`
        )

        const xhrResponse = await page.waitForResponse(
            (r: any) => r.request().url().includes(endpoint)
        )

        const pload = await xhrResponse.json()

        res(pload)
        
    })
}

export const getDailyUsage = (page: Page, meterName: string, timePeriod: TimePeriod) => {}

export const getHourlyUsage = (page: Page, meterName: string, timePeriod: TimePeriod) => {}