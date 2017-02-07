// Angular bootstrapping
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// Top-level application module
import { AppModule } from './app/app.module';

// Global (i.e. non-component) styles. Webpack will bundle these into a separate CSS file.
import './main.browser.sass';

function bootstrapWithEnv(env) {
  if (env === 'production') {

    disableDebugTools();
    enableProdMode();
    return () => { /* do nothing */ };
  }
  else {
    /**
     * Make debugging features available in Chrome dev tools.
     *
     * See https://github.com/angular/angular/blob/master/TOOLS.md
     */
    return (appRef: any) => {
      enableDebugTools(appRef);
    };
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(bootstrapWithEnv(process.env.NODE_ENV))
  .catch(err => console.error(err));
