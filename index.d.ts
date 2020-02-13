declare module 'probot-actions-adapter' {
  import { ApplicationFunction } from 'probot';

  function setup(appFns: Array<string | ApplicationFunction>): void;
  export = setup;
}
