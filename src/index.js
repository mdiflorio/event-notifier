require("dotenv").config();
const moment = require("moment");
const events = require("./events");
const Push = require( 'pushover-notifications')


const TODAY = 0;
const ONE_WEEK = 7;

events.list.forEach(event => {
  const daysToEvent = daysRemaining(event.date);

  if (daysToEvent == TODAY) {
    sendPushNotification(`${event.name} today!!`);
  } else if (event.one_week_reminder && daysToEvent == ONE_WEEK) {
    sendPushNotification(`${event.name} in one week!!`);
  }
});

async function sendPushNotification(event) {
  const notifier = new Push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN'],
  })

  const msg = {
    message: event,	
    title: "Event",
    sound: 'magic',
    device: 'iphone',
    priority: 1
  }

  notifier.send( msg, function( err, result ) {
    if ( err ) {
      throw err
    }
  })

}

function daysRemaining(event) {
  const todaysdate = moment();
  const eventdate = moment(`${todaysdate.year()}-${event}`);
  return eventdate.diff(todaysdate, "days");
}
