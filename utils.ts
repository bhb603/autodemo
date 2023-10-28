/**
 * Converts a "speed" value to a character delay,
 * which will be used to pause between printing each character.
 *
 * Speed is an arbitrary scale: 1=slow, 2=normal, >=3=fast.
 */
export function speedToCharDelay(speed: number): number {
  const normalzedSpeed = Math.max(1, speed);
  return 150 / (normalzedSpeed * normalzedSpeed);
}

/**
 * Print a line of text to stdout
 * with a random delay between each character to simulate typing.
 */
export async function printLine(prefix: string, line: string, speed: number) {
  const delayMs = speedToCharDelay(speed);
  const encoder = new TextEncoder();
  await Deno.stdout.write(encoder.encode(prefix + " "));
  for (const char of line) {
    await Deno.stdout.write(encoder.encode(char));
    await randomDelay(delayMs);
  }
}

function randomDelay(maxMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * maxMs);
  });
}

export function runCommand(
  line: string,
  stdout: WritableStream,
  stderr: WritableStream,
  env?: Record<string, string>,
): Promise<Deno.CommandStatus> {
  const cmd = new Deno.Command("sh", {
    args: ["-c", line],
    stdin: "inherit",
    stdout: "piped",
    stderr: "piped",
    env,
  });
  const child = cmd.spawn();
  child.stdout.pipeTo(stdout, { preventClose: true });
  child.stderr.pipeTo(stderr, { preventClose: true });
  return child.status;
}
