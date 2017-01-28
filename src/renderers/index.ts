import { render as blessedRenderer} from './blessed';

const renderers: { [name: string]: IRenderer } = {
  BLESSED : blessedRenderer
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