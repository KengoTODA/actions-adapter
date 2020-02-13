import { resolve } from 'path'
import { v4 } from 'uuid'
import { debug, setFailed } from '@actions/core'
import { ApplicationFunction, createProbot } from 'probot'

process.env.DISABLE_STATS = 'true';

export default function(...handlers: Array<string | ApplicationFunction>) {
  // Setup Probot app
  const githubToken = process.env.GITHUB_TOKEN;
  const probot = createProbot({ githubToken });
  probot.setup(handlers);

  // Process the event
  const event = process.env.GITHUB_EVENT_NAME as string;
  const payloadPath = process.env.GITHUB_EVENT_PATH as string;
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const payload = require(resolve(payloadPath));
  debug(`Receiving event ${JSON.stringify(event)}`);
  probot.receive({ name: event, payload, id: v4() }).catch((err: Error) => {
    // setFailed logs the message and sets a failing exit code
    setFailed(`Action failed with error: ${err.message}`);
  });
};
