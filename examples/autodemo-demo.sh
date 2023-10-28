# `autodemo` is a tool for running scripted demos in the teminal.

# ---

# It reads a "demofile", a shell script with some rules and restrictions,
# and processes it as follows:

# ---

# - lines matching `# ---` pause the script until you press `<ENTER>`
# - any other lines beginning with a `#` are printed as is
# - empty lines are ignored
# - all other lines will be run as commands: `sh -c {line}`

# ---

# Lines are printed one character at a time with random pauses
# to simulate being typed by a human.
# ---
# In fact, this iteself is an `autodemo` script 🤯
# ---
# Here are some commands being run:

autodemo --help

deno eval -p "Math.sqrt(77)"

# Cheers!
