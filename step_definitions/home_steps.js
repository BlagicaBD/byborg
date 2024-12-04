const { I, homePage, And } = inject();
Given("I navigate to Oranum web application home page", async () => {
  await homePage.verifyHomePage();
});

When("I type {string} in the search", async (searchTerm) => {
  await homePage.performSearch(searchTerm);
});

Then("only matching names are displayed in search dropdown", async () => {
  await homePage.verifySearchResults();
});

Then("I view all results and validate they contain {string}", async (name) => {
  await homePage.pressEnterToShowAllResults();
  await homePage.validatePerformerNames(name);
});

When("I choose a {string}", async (category) => {
  await homePage.selectCategory(category);
});

Then("the profile match the current category", async () => {
  await homePage.validateCategoryFilter();
});

