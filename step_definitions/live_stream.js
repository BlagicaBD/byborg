const { I, homePage, And } = inject();
Given("I navigate to Oranum application as a guest user", async () => {
  await homePage.verifyHomePage();
});

When("I click on the psychic with live button", async () => {
  await homePage.handleLiveStream();
});

Then("a sign up modal is showed", async () => {
  homePage.verifyJoinButtonVisibility();
});

When("I click on Get Credits button", async () => {
  homePage.clickGetCreditBtn()
});

When("I press add to favorites", async () => {
  homePage.clickAndAddToFavorite()
});

When("I clicks to get a surprise buttons", async () => {
  await homePage.handleSurpriseElements();
});

When("I press to start private session", async () => {
  homePage.startPrivateSession();
});


