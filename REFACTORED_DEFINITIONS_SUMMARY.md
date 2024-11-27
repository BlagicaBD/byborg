### home_steps

In the home_steps file, I have grouped the step for show all results and validation of the performer names into a single reusable step. This improves readability, reduces redundancy, and makes the step name clearly describe the action and validation together.

### live_stream

In the live_stream_steps file, I have removed the navigateToExpectedUrlAndCheckLiveStatus method since the assertions for the live status are already handled within the handleLiveStream method. Also, in the signup-to-a-surprise-buttons scenario, the step ‘Then I click to get a surprise button and show the signup modal’ is divided into ‘When I click to get a surprise button’ and ‘Then a signup modal is shown’ in order to reuse the same step definitions across other scenarios.

### Feature files
The feature files have been updated to reflect these changes in the step definitions. Additionally, in the feature files, in some of the scenarios, ‘When’ has been replaced with ‘And’ in cases to improve the logical flow of the scenario. One redundant step has been removed from the feature file and from the steps. I have commented out the removed step in the feature file for representation purposes (for this task only)

### Benefits of the updates in the step_definitions and features files:
* The updated step names describe the action and validation together, making it easier to understand the purpose of each step, improving readeability 
* Instead of maintaining two separate steps, we now have a single concise step that reduces redundancy
* Using single definition making it easier to maintain and modify in the future, better modularity 
* Using 'And' for related actions improves the logical structure of the scenarios
