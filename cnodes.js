/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

// Export core nodes
export * from "./lib/core/env.js";
export * from "./lib/core/node.js";
export * from "./lib/core/program.js";
export * from "./lib/core/socket.js";
export * from "./lib/core/type.js";
export * from "./lib/nodes/call.js";
export * from "./lib/nodes/console.js";
export * from "./lib/nodes/log.js";
export * from "./lib/nodes/fgetvar.js";
export * from "./lib/nodes/for.js";
export * from "./lib/nodes/getvar.js";
export * from "./lib/nodes/if.js";
export * from "./lib/nodes/setvar.js";
export * from "./lib/nodes/while.js";
export * from "./lib/nodes/fif.js";
export * from "./lib/nodes/wait.js";

// Export boolean nodes
export * from "./lib/nodes/bool/fcompare.js";

// Export string nodes
export * from "./lib/nodes/string/fsconst.js";
export * from "./lib/nodes/string/fconcat.js";

// Export math nodes
export * from "./lib/nodes/math/fnconst.js";
export * from "./lib/nodes/math/fadd.js";
export * from "./lib/nodes/math/fdiv.js";
export * from "./lib/nodes/math/fmul.js";
export * from "./lib/nodes/math/fsqrt.js";
export * from "./lib/nodes/math/fmod.js";
export * from "./lib/nodes/math/ftofixed.js";

// Export arrays nodes
export * from "./lib/nodes/array/apush.js";
export * from "./lib/nodes/array/faconst.js";
export * from "./lib/nodes/array/famake.js";
export * from "./lib/nodes/array/faget.js";
export * from "./lib/nodes/array/falength.js";
export * from "./lib/nodes/array/amap.js";
export * from "./lib/nodes/array/famap.js";
export * from "./lib/nodes/array/areduce.js";
export * from "./lib/nodes/array/fareduce.js";

// Export objects nodes
export * from "./lib/nodes/object/fomake.js";
export * from "./lib/nodes/object/fobreak.js";
