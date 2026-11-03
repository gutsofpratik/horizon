import {startHost} from './start.ts';
import {registerModelRuntime} from './models/runtime.ts';
// Shared model services do not grant a web session native desktop privileges.
await startHost(undefined,(app,context)=>registerModelRuntime(app,context));
