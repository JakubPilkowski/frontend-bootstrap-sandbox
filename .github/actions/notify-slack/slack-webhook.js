import axios from 'axios';

const { SLACK_WEBHOOK_URL, NOTIFY_MESSAGE, NOTIFY_TYPE } = process.env;

if (!SLACK_WEBHOOK_URL) {
  throw new Error('SLACK_WEBHOOK_URL is required');
}

if (!NOTIFY_MESSAGE) {
  throw new Error('NOTIFY_MESSAGE is required');
}

const requestConfig = {
  url: SLACK_WEBHOOK_URL,
  message: NOTIFY_MESSAGE,
  type: NOTIFY_TYPE || 'good',
};

async function notifySlack(config) {
  try {
    await axios.post(config.url, {
      text: 'GitHub Actions',
      attachments: [
        {
          color: config.type,
          text: config.message,
        },
      ],
    });
  } catch (error) {
    console.error('Error sending message to Slack', error);
  }
}

await notifySlack(requestConfig);
