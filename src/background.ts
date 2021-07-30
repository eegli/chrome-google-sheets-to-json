chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  //@ts-ignore the typings seem to be very alpha stagey
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'docs.google.com' },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { pathContains: 'spreadsheets/d' },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    };

    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
