import 'core-js';
import 'zone.js/dist/zone';

if (process.env.NODE_ENV === 'production') {
  /* do production-only configuration */
}
else {
  Error.stackTraceLimit = Infinity;
  // tslint:disable-next-line
  require('zone.js/dist/long-stack-trace-zone');
}
