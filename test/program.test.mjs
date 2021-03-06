import tap from "tap";
import { Program } from "../src/core/program.mjs";
import { For } from "../src/nodes/for.mjs";
import { Log } from "../src/nodes/log.mjs";

tap.test("Program will export, import then executes", async (test) => {
  // Create a new program
  let prg = Program.instance();

  // create the "For" node
  let fn = For.instance();
  // Define console node
  let ln = Log.instance();

  // Create flow connections and inputs/outputs
  fn.prev.connect(prg.enter.next("Begin"));
  fn.input("From").connect(prg.enter.output("Val"));
  fn.input("To").value = 10;

  prg.exit.prev.connect(fn.next("Out"));
  prg.exit.input("Val").connect(fn.output("Index"));

  ln.input("Val").connect(fn.output("Index"));
  ln.prev.connect(fn.next("Do"));

  // Add nodes
  prg.addNode(fn).addNode(ln);

  let count = 0;
  Program.events.on("cn:log", (msg) => {
    count++;
  });

  await prg.process();

  test.same(count, 10, "Logged 10 times");

  test.end();
});
