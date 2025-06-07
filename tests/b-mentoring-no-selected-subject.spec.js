const { chromium, firefox, webkit, devices } = require("playwright");
const { expect } = require("chai");

// Define desktop and mobile browser environments
const environments = [
  { name: "Chromium", launcher: chromium, contextOptions: { viewport: null } },
  { name: "Firefox", launcher: firefox, contextOptions: { viewport: null } },
  { name: "WebKit", launcher: webkit, contextOptions: { viewport: null } },
  {
    name: "Mobile - iPhone 12",
    launcher: chromium,
    contextOptions: {
      ...devices["iPhone 12"],
    },
  },
];

environments.forEach(({ name, launcher, contextOptions }) => {
  describe(`Mentoring Schedule Flow on ${name} - Dealls QA Test`, function () {
    let browser, context, page;

    // Run once before all tests in this suite
    before(async () => {
      browser = await launcher.launch({
        headless: true,
      });
    });

    // Run once after all tests in this suite
    after(async () => {
      if (browser) await browser.close();
    });

    // Run before each test
    beforeEach(async () => {
      context = await browser.newContext(contextOptions);
      page = await context.newPage();
      await page.goto(
        "https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring"
      );

      await page.click("xpath=//img[@alt='Cika']");
      await page.waitForURL("**/mentoring/cika-143");

      await page.click("xpath=//button[text()='Ajukan Jadwal']");
    });

    // Run after each test
    afterEach(async () => {
      await context.close();
    });

    describe("2. Not selecting subjects yet", function () {
      it("should prevent continuing without selecting a topic", async () => {
        const nextButton = await page.locator(
          "xpath=//button[@id='mentoring-schedule-topic-request-session-btn']"
        );
        expect(await nextButton.isDisabled()).to.be.true;
      });
    });
  });
});
