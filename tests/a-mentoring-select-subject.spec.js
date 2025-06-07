const { chromium } = require("playwright");
const { expect } = require("chai");

describe("Mentoring Schedule Flow - Dealls QA Test", function () {
  this.timeout(10000);

  let browser, context, page;

  before(async () => {
    browser = await chromium.launch({
      headless: true,
      args: ["--start-maximized"],
    });
  });

  after(async () => {
    if (browser) await browser.close();
  });

  beforeEach(async () => {
    context = await browser.newContext({
      viewport: null,
    });
    page = await context.newPage();
    await page.goto(
      "https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring"
    );

    await page.click("xpath=//img[@alt='Cika']");
    await page.waitForURL("**/mentoring/cika-143");

    await page.click("xpath=//button[text()='Ajukan Jadwal']");
  });

  afterEach(async () => {
    await context.close();
  });

  describe("1. Select available subject", function () {
    it("should allow user to select a topic and continue scheduling", async () => {
      await page.click("xpath=//button//div[text()='LPDP']");
      await page.click(
        "xpath=//button[@id='mentoring-schedule-topic-request-session-btn']"
      );

      await page.click("xpath=//div[text()='Select Date Range']");
      await page.click("xpath=//span[text()='10']");
      await page.click("xpath=//span[text()='16']");

      await page.fill("xpath=//input[@id='proposedTimes_0_startTime']", "0821");
      await page.fill("xpath=//input[@id='proposedTimes_0_endTime']", "2321");

      await page.fill(
        "xpath=//textarea[@id='notes']",
        `Hi Cika, Saya Nurul Arifin & saya berharap dapat memiliki sesi mentoring dengan Anda.

      Saat ini, saya tertarik untuk mengejar Beasiswa LPDP. Tujuan saya untuk sesi ini adalah Meningkatkan persentase lulus LPDP.

      Saya ingin tahu secara khusus tentang test-test di LPDP.
      1. Score IELTS
      2. Pertanyaan interview`
      );

      await page.click(
        "xpath=//button[@id='mentoring-schedule-pick-schedule-request-session-btn']"
      );

      await page.fill("xpath=//input[@id='fullName']", "Nurul Arifin");
      await page.fill("xpath=//input[@id='whatsapp']", "62123456789");
      await page.fill("xpath=//input[@id='email']", "1234@dealls.com");
      await page.fill("xpath=//input[@id='birthDate']", "09/10/1995");

      await page.click(
        "xpath=//button[@id='mentoring-schedule-personal-information-request-session-btn']//span[text()='Selanjutnya']"
      );

      await page.fill("xpath=//input[@id='password']", "TestPassword123");
      await page.fill(
        "xpath=//input[@id='confirmPassword']",
        "TestPassword123"
      );

      await page.check("xpath=//input[@type='checkbox' and @value='1']");
      await page.check("xpath=//input[@type='checkbox' and @value='3']");

      await page.click(
        "xpath=//button[@id='mentoring-schedule-finish-request-session-btn']"
      );

      await page.click("xpath=//button//span[text()='Lihat Detailnya']");

      const confirmation = await page.textContent(
        "xpath=//div[@class='font-bold text-[10px] text-white lg:text-[13px]']"
      );
      expect(confirmation).to.not.be.null;
    });
  });
});
