const { I } = inject();
module.exports = {
  webElements: {
    //home page navigation bar and login elements
    homePage: "#home",
    loginButton: "#page-nav-signup",
    sliderBar: "ul[class*=sidebar-menu]",
    mainLoginSignUpOverlayApplet:"[data-testid='mainLoginSignUpOverlayApplet']",
    closeDialogButton:".mc_js_login_or_signup>div>.mc_dialog__close.js_close_dialog",
    categorySideFilter: ".sidebar-filters",
    

    //search elements
    searchButton: "#search",
    searchPlaceholder: 'input[placeholder="Search for Expert or category"]',
    newResult: "ul.toolbar-autosuggest>li",
    showAllResult: 'ul.toolbar-autosuggest>li:last-of-type',

    //performers page elements
    performerNameElements: "article[data-type=performer]>a>div:nth-of-type(2)>.thumb-data-item--name-container>div",
    userPageTitle: "h1.listpage-title",
    checkLiveStatus:".thumb--modern[data-status='1'] .status-text--live, .thumb--modern[data-status='2'] .status-text--live, .thumb--modern[data-status='3'] .status-text--live",
    checkBadgeLive: "div[data-testid='badgeLive']",
    performerCategoryList:"article[data-type='performer'] .thumb-data-willingness-list",

    //favorites elements
    getJoinBtn: "button[data-testid='joinNowButtonApplet']",
    getCreditBtn: "div[data-id='buyCreditIcon']",
    getAddToFavoriteBtn: "div[data-testid='favoriteIconLeft']",
    getSurpriseIcon: "div[data-id='surpriseIcon']",
    getSurpriseOneCredit: "[data-testid='surpriseListBottom']>:nth-of-type(1)",
    getSurprisefiveCredit: "[data-testid='surpriseListBottom']>:nth-of-type(2)",
    getSurpriseTenCredit: "[data-testid='surpriseListBottom']>:nth-of-type(3)",
    getSurpriseTwentyFiveCredit:"[data-testid='surpriseListBottom']>:nth-of-type(4)",
    getStartSessionBtn: "div[data-arma-state='private']",
    surpriseListBottom: "[data-testid='surpriseListBottom']>.mc_surprise_item",
    
  },

  async verifyHomePage() {
    I.amOnPage("/");
    await I.grabTextFrom(this.webElements.homePage);
    I.seeElement(this.webElements.sliderBar);
  },

  typeInSearch(searchTerm) {
    this.searchTerm = searchTerm;
    I.seeElement(this.webElements.searchPlaceholder);
    I.fillField(this.webElements.searchPlaceholder, searchTerm);
    I.waitForVisible(this.webElements.newResult);
  },

  async matchName() {
    const ele = await I.grabTextFromAll(this.webElements.newResult);
    const matcher = new RegExp(this.searchTerm, "i");
    ele.forEach((text) => {
      I.assertMatchRegex(text, matcher);
    });
  },
   
  async clickOnSearchResult() {
    await I.click(this.webElements.showAllResult);
  },

  async countAndValidatePerformerNameElements(name) {
    I.seeElement(this.webElements.userPageTitle);
    const elements = await I.grabTextFromAll(
      this.webElements.performerNameElements
    );
    const count = elements.length;
    for (const text of elements) {
     await I.assertContains(text.toLowerCase(), name);
    }
    I.assertEquals(elements.length, count);
    return count;
  },

  async checkLiveStream() {
    await I.click(this.webElements.checkLiveStatus);
  },

  async verifyHomePageWithGuestUser() {
    I.amOnPage("/");
    await I.grabTextFrom(this.webElements.homePage);
    I.seeElement(this.webElements.loginButton);
  },

  async navigateToExpectedUrlAndCheckLiveStatus() {
    I.seeElement(this.webElements.checkLiveStatus);
    await I.click(this.webElements.checkLiveStatus);
    await I.seeElement(this.webElements.checkBadgeLive);
  },
  
  async clickGetCreditBtn() {
    await I.click(this.webElements.getCreditBtn);
  },

  async verifyJoinButtonVisibility() {
    await I.waitForVisible(this.webElements.getJoinBtn, timeout._10s);
    I.assertTextEquals("JOIN NOW", this.webElements.getJoinBtn);
  },
  
  async addToFavorite() {
    await I.click(this.webElements.getAddToFavoriteBtn);
  },

  async getStartedSessionBtn() {
    await I.forceClick(this.webElements.getStartSessionBtn);
  },

  async getSurpriseModel() {
    await I.click(this.webElements.getSurpriseIcon);
  },

  async clickAndCheckSurpriseElements() {
    const numberOfElements = await I.grabNumberOfVisibleElements(this.webElements.surpriseListBottom);
    for (let i = 1; i <= numberOfElements; i++) {
      const elementSelector = `${this.webElements.surpriseListBottom}:nth-of-type(${i})`;
      await I.click(elementSelector);
      await I.seeElement(this.webElements.mainLoginSignUpOverlayApplet);
      await I.click(this.webElements.closeDialogButton);
      await I.waitForInvisible(this.webElements.mainLoginSignUpOverlayApplet); 
    }
  },
  
  async chooseCategory(category) {
    await I.click(category, this.webElements.categorySideFilter);
    this.selectedCategory = category;
  },

  async validateCategoryFilter() {
    const categorylist = await I.grabTextFromAll(
      this.webElements.performerCategoryList
    );
    categorylist.forEach((element) => {
      I.assertContain(element, this.selectedCategory);
      //unique contegory
      const cateList = element.split("\n");
      const uniquecateList = new Set(cateList);
      I.assertEqual(cateList.length, uniquecateList.size);
    });
  },
};