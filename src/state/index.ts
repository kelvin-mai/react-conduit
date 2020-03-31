import { IConfig, createOvermind } from 'overmind';
import { createHook } from 'overmind-react';

const config = {};

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const overmind = createOvermind(config);

export const useOvermind = createHook<typeof config>();
