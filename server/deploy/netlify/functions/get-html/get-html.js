const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
    const URL = `${process.env.URL}/__app.html?__mock-url=${encodeURI(event.path)}`
    const HTML = await getHtml(URL)

    return {
        statusCode: 200,
        body: HTML + '<!-- ssr rendered -->'
    }
}

async function getHtml(URL){
    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
    });

    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForFunction('window.routify === "ready"')
    const html = await page.content()
    browser.close();
    return html
}