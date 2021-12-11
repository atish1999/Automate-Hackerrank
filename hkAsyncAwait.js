const puppeteer = require('puppeteer');
const codeObj = require('./code');

const loginUrl = 'https://www.hackerrank.com/auth/login';
const email = 'tleleo615@gmail.com';
const password = 'tleleo123.';


console.log("before");

// ? declaring iife with normal function
// (async function hk_automate() {
// })();


// ? declaring iife with fat arrow function
(async () => {

    try {

        const broswer = await puppeteer.launch({
            headless: false,
            slowMo: true,
            defaultViewport: null,
            args: ['--start-maximized'],
        });

        const newTab = await broswer.newPage();
        await newTab.goto(loginUrl);
        await newTab.waitForSelector('input[type="text"]', { visible: true });
        await newTab.type('input[type="text"]', email, { delay: 50 });
        await newTab.waitForSelector('input[type="password"]', { visible: true });
        await newTab.type('input[type="password"]', password, { delay: 50 });
        await newTab.click('button[data-analytics="LoginPassword"]', {
            delay: 10
        });

        await waitAndClick('a[data-attr1="algorithms"]', newTab);
        await waitAndClick('input[value="warmup"]', newTab);
        await newTab.waitFor(3000);
        // ? $$() ==> means document.querySelectorAll()
        // ? $() ==> means document.querySelector()

        let allQuestionsPromise = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        await solveQuestion(newTab, allQuestionsPromise[0], codeObj.answers[0]);

        // await broswer.close();

    } catch (error) {
        console.log(error);
    }

})();

console.log("after");
const waitAndClick = async (selector, cPage) => {

    await cPage.waitForSelector(selector);
    const isClicked = cPage.click(selector, { delay: 50 });
    return isClicked;
}



const solveQuestion = async (page, question, answer) => {

    try {
        await question.click();
        await waitAndClick(".monaco-editor.no-user-select.vs", page);
        await waitAndClick(".checkbox-input", page);
        await page.waitForSelector("textarea[id='input-1']");
        await page.type("textarea[id='input-1']", answer);
        await page.keyboard.down("Control");
        await page.keyboard.press('A', { delay: 100 });
        await page.keyboard.press('X');
        await page.keyboard.up('Control');
        await waitAndClick(".monaco-editor.no-user-select.vs", page);
        await page.keyboard.down("Control");
        await page.keyboard.press('A', { delay: 100 });
        await page.keyboard.press('V', { delay: 100 });
        await page.keyboard.up('Control');
        await page.click("button.hr-monaco__run-code", { delay: 50 });
        await page.waitForSelector(".status.compile-success");
        await waitAndClick('button.hr-monaco-submit', page);
        // "button.hr-monaco-submit"
        await page.waitForTimeout(1000);

    } catch (err) {
        console.log(err);
    }


};





