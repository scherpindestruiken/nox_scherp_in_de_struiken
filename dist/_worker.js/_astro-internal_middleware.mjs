globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_Cg-AXzAT.mjs';
import './chunks/astro/server_Bcrc7BgJ.mjs';
import { s as sequence } from './chunks/index_jwhNgLRH.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
