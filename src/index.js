require("dotenv").config();
const moment = require("moment");
const events = require("./events");
const axios = require("axios");

const TODAY = 0;
const ONE_WEEK = 7;

events.list.forEach(event => {
  const daysToEvent = daysRemaining(event.date);

  if (daysToEvent == TODAY) {
    sendSlackAlert(`${event.name} today!!`);
  } else if (event.one_week_reminder && daysToEvent == ONE_WEEK) {
    sendSlackAlert(`${event.name} in one week!!`);
  }
});

async function sendSlackAlert(event) {
  axios.post(process.env.SLACK_WEBHOOK, { text: event }).catch(err => {
    console.log(("Error", err));
  });
}

function daysRemaining(event) {
  const todaysdate = moment();
  const eventdate = moment(`${todaysdate.year()}-${event}`);
  return eventdate.diff(todaysdate, "days");
}
