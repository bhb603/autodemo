#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run

import { load } from "@std/dotenv";
import { parseArgs } from "@std/cli";

import { VERSION } from "./version.ts";

import { printLine, runCommand } from "./utils.ts";

const USAGE = `autodemo ${VERSION}

  USAGE:
    autodemo [OPTIONS] <demofile>

  OPTIONS:
    -h, --help            Print help
    --env-file <FILE>     Load environment variables from a dotenv file
    -f, --full-auto       Run without pausing for input
    -s, --speed <SPEED>   Set the speed of the demo. 1=slowest, 2=medium, 3=fast (default: 2)
`;

async function main(): Promise<void> {
  const args = parseArgs(Deno.args, {
    string: ["speed", "env-file"],
    boolean: ["help", "full-auto"],
    default: { speed: 2 },
    alias: { s: "speed", h: "help", f: "full-auto" },
  });

  if (args.help) {
    console.log(USAGE);
    Deno.exit(0);
  }

  const speed = parseInt(args.speed as string);
  if (Number.isNaN(speed)) {
    console.error("ERROR: Speed must be a number");
    Deno.exit(1);
  }

  let cmdEnv: Record<string, string> | undefined;
  if (args["env-file"]) {
    cmdEnv = await load({ envPath: args["env-file"] });
  }

  const fullAuto = args["full-auto"];

  const outputPrefix = ">";
  const pauseRegex = /^#\s*---/;

  const demoFile = args._[0];
  if (!demoFile) {
    console.log(USAGE);
    console.error("ERROR: demofile required");
    Deno.exit(1);
  }

  const contents = await Deno.readTextFile(`${demoFile}`);
  for (const line of contents.split("\n")) {
    if (pauseRegex.test(line)) {
      if (fullAuto) {
        continue;
      } else {
        prompt(outputPrefix);
      }
    } else if (line.startsWith("#")) {
      // print output
      await printLine(outputPrefix, line + "\n", speed);
    } else if (line.trim() === "") {
      continue;
    } else {
      // run command
      if (fullAuto) {
        await printLine(outputPrefix, line + "\n", speed);
      } else {
        await printLine(outputPrefix, line, speed);
        await Deno.stdin.read(new Uint8Array(1));
      }
      await runCommand(
        line,
        Deno.stdout.writable,
        Deno.stderr.writable,
        cmdEnv,
      );
    }
  }
}

if (import.meta.main) {
  main();
}
