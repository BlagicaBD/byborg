const { I, homePage, And } = inject();
Given("I navigate to Oranum web application home page", async () => {
  await homePage.verifyHomePage();
});

When("I type {string} in the search", (searchTerm) => {
  homePage.typeInSearch(searchTerm);
});

Then("only matching names are displayed in search dropdown", async () => {
  await homePage.matchName();
});

Then("I view all results and validate they contain {string}", async (name) => {
  await homePage.clickOnSearchResult(); 
  await homePage.countAndValidatePerformerNameElements(name); 
});  

When("I choose a {string}", async(category) => {
await homePage.chooseCategory(category);
});
Then("the profile match the current category", async ()=>{
await homePage.validateCategoryFilter();
});
 