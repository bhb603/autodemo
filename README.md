# AutoDemo

Run scripted demos in the terminal!

## How it works

`autodemo` is a tool for running scripted demos in the terminal.

It reads a "demofile", a shell script with some rules and restrictions, and
processes it as follows:

- lines matching `# ---` pause the script until you press `<ENTER>`
- any other lines beginning with a `#` are printed as is
- empty lines are ignored
- all other lines will be run as commands: `sh -c {line}`

> [!IMPORTANT]
> Commands must be on a single line

Lines are printed one character at a time with random pauses to simulate being
typed by a human and provide a more natural viewing experience.

The typing speed can be controlled with the `-s, --speed` flag. 1=slow, 2=medium
(default), 3=fast... anything >10 is essentially instant.

The final result is a scripted CLI session with real command execution and
output, great for demos or terminal recordings.

### Demo

Here is an autodemo demo, using autodemo! It was recorded with
[asciinema](https://asciinema.org):

```sh
asciinema rec -c "autodemo examples/autodemo-demo.sh" -t "autodemo demo" demo.cast
```

[![asciicast](https://asciinema.org/a/9ml8xxrZFv8aRWIkF9YRsZPNn.svg)](https://asciinema.org/a/9ml8xxrZFv8aRWIkF9YRsZPNn)
