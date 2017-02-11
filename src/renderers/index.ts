import { render as ciRenderer } from './ci';
import { render as blessedRenderer } from './blessed';
import { render as inlineTableRenderer } from './inlinetable';
import { render as jsonRenderer } from './json';

const renderers: { [name: string]: IRenderer } = {
  BLESSED     : blessedRenderer,
  INLINETABLE : inlineTableRenderer,
  CI          : ciRenderer,
  JSON        : jsonRenderer
};

/**
 * @param  {string} rendererName
 * @returns boolean
 */
export function rendererExists(rendererName: string): boolean
{
  return typeof renderers[rendererName.toUpperCase()] !== 'undefined';
};

/**
 * @param  {string} rendererName
 * @returns IRenderer
 */
export function getRenderer(rendererName: string): IRenderer
{
  if (!rendererExists(rendererName)) {
    throw new Error(`Renderer ${rendererName} not found in renderers`);
  }

  return renderers[rendererName.toUpperCase()];
};