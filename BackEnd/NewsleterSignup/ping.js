const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: "791cf66e26ee0bba7ac19f52166e2601",
    server: "us21"
});

async function callPing() {
  const response = await mailchimp.ping.get();
  const lists1 = lists.getAllLists();
  console.log(response);
  console.log(lists1);
}

callPing();