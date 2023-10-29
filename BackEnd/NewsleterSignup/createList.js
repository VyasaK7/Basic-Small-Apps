const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "791cf66e26ee0bba7ac19f52166e2601-us21",
    server: "us21"
});

const run = async () => {
  const response = await client.lists.createList({
    name: "VyasaFirstList",
    permission_reminder: "You have signed up for Vyasa's Mailing list!",
    email_type_option: true,
    contact: {
      company: "VyasaInc",
      address1: "Chowdeshwari Nagar",
      city: "Bengaluru",
      country: "India",
    },
    campaign_defaults: {
      from_name: "Vyasa Krishna",
      from_email: "vyasak253@gmail.com",
      subject: "A piece of Vyasa's Immeasurable Intellectual Capacity",
      language: "English",
    },
  });
  console.log(response);
};

run();
