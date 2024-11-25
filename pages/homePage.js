const { I } = inject();
const TIMEOUTS = {
  SHORT: 2,
  MEDIUM: 5,
  LONG: 10,
  EXPLICIT_WAIT: 1000
};
module.exports = {
  webElements: {
    // Navigation elements
    homePage: "#home",
    loginButton: "#page-nav-signup",
    sidebar: "ul[class*=sidebar-menu]",

    // Filters and overlays
    mainLoginSignUpOverlayApplet: "[data-testid='mainLoginSignUpOverlayApplet']",
    categorySideFilter: ".sidebar-filters",

    // Search elements
    searchButton: "#search",
    searchPlaceholder: 'input[placeholder="Search for Expert or category"]',
    newSearchResult: "ul.toolbar-autosuggest>li",
    showAllResults: 'ul.toolbar-autosuggest>li:last-of-type',

    // Performer elements
    performerNameElements: "article[data-type=performer]>a>div:nth-of-type(2)>.thumb-data-item--name-container>div",
    checkLiveStatus: ".thumb--modern[data-status='1'] .status-text--live, .thumb--modern[data-status='2'] .status-text--live, .thumb--modern[data-status='3'] .status-text--live",
    performerCategoryList: "article[data-type='performer'] .thumb-data-willingness-list",

    // UI elements
    pageTitle: "h1.listpage-title",
    badgeLive: "div[data-testid='badgeLive']",

    // Action buttons
    joinButton: "button[data-testid='joinNowButtonApplet']",
    getCreditButton: "div[data-id='buyCreditIcon']",
    addToFavoriteButton: "div[data-testid='favoriteIconLeft']",
    startSessionButton: "div[data-arma-state='private']",
    closeDialogButton: ".mc_js_login_or_signup>div>.mc_dialog__close.js_close_dialog",

    // Surprise elements
    surpriseIcon: "div[data-id='surpriseIcon']",
    surpriseOneCredit: "[data-testid='surpriseListBottom']>:nth-of-type(1)",
    surpriseFiveCredit: "[data-testid='surpriseListBottom']>:nth-of-type(2)",
    surpriseTenCredit: "[data-testid='surpriseListBottom']>:nth-of-type(3)",
    surpriseTwentyFiveCredit: "[data-testid='surpriseListBottom']>:nth-of-type(4)",
    surpriseListBottom: "[data-testid='surpriseListBottom']>.mc_surprise_item",

  },
  // Utility methods
  async waitAndClick(selector, timeout = TIMEOUTS.MEDIUM) {
    try {
      await I.waitForElement(selector, timeout);
      await I.click(selector);
    } catch (error) {
      console.error(`Failed to click element: ${selector}`, error);
      throw new Error(`Click operation failed for: ${selector}`);
    }
  },

  async assertElementPresent(selector, timeout = TIMEOUTS.MEDIUM) {
    try {
      await I.waitForElement(selector, timeout);
      await I.seeElement(selector);
    } catch (error) {
      throw new Error(`Element not found: ${selector}`);
    }
  },

  async verifyHomePage(isGuestUser = false) {
    I.amOnPage("/");
    await I.grabTextFrom(this.webElements.homePage);
    await this.assertElementPresent(this.webElements.sidebar);

    if (isGuestUser) {
      await this.assertElementPresent(this.webElements.loginButton);
    }
  },


  async performSearch(searchTerm) {
    await this.assertElementPresent(this.webElements.searchPlaceholder);
    I.fillField(this.webElements.searchPlaceholder, searchTerm);
    await I.wait(TIMEOUTS.SHORT);
    this.searchTerm = searchTerm;
  },


  async verifySearchResults() {
    const results = await I.grabTextFromAll(this.webElements.newSearchResult);
    const matcher = new RegExp(this.searchTerm, "i");
    results.forEach((text) => {
      I.assertMatchRegex(text, matcher);
    });
  },

  async clickOnShowAllSearchResults() {
    await this.waitAndClick(this.webElements.showAllResults);
  },


  async validatePerformerNames(name) {
    await this.assertElementPresent(this.webElements.pageTitle);
    const elements = await I.grabTextFromAll(this.webElements.performerNameElements);
    const count = elements.length;
    for (const text of elements) {
      I.assertContains(text.toLowerCase(), name);
    }
    I.assertEquals(elements.length, count);
    return count;
  },

  // Live stream handling
  async handleLiveStream() {
    await this.waitAndClick(this.webElements.checkLiveStatus);
    await this.assertElementPresent(this.webElements.badgeLive);
  },

  async clickGetCreditBtn() {
    await this.waitAndClick(this.webElements.getCreditButton);
  },

  async clickOnJoinNowButton() {
    await I.waitForVisible(this.webElements.joinButton, TIMEOUTS.LONG);
    I.waitForText("JOIN NOW");
  },


  async clickAndAddToFavorite() {
    await this.waitAndClick(this.webElements.buttons.addToFavorite);
  },

  async startPrivateSession() {
    await I.forceClick(this.webElements.startSessionButton);
  },

  async handleSurpriseElements() {
    const elements = await I.grabNumberOfVisibleElements(this.webElements.surpriseListBottom);

    for (let i = 1; i <= elements; i++) {
      const selector = `${this.webElements.surpriseListBottom}:nth-of-type(${i})`;
      // click on the nth element
      await this.waitAndClick(selector);
      // check if mainLoginSignUpOverlayApplet is present
      await this.assertElementPresent(this.webElements.mainLoginSignUpOverlayApplet);
      // click on the close button on the dialog
      await this.waitAndClick(this.webElements.closeDialogButton);
      await I.wait(TIMEOUTS.SHORT);
    }
  },

  async selectCategory(category) {
    await this.assertElementPresent(this.webElements.categorySideFilter);
    await this.waitAndClick(category);
    this.selectedCategory = category;
  },

  async validateSelectedCategory() {
    const categories = await I.grabTextFromAll(this.webElements.performerCategoryList);
    categories.forEach(element => {
      I.assertContain(element, this.selectedCategory);
      const categoryList = element.split("\n");
      const uniqueCategories = new Set(categoryList);
      I.assertEqual(categoryList.length, uniqueCategories.size);
    });
  }
};



