local args = {...}
local file = args[1]
local path = http.get("https://theslaymann.github.io/slayds/".. file)
program = fs.open("slayds", "w")
program.write(path.readAll())
program.close()
path.close()
print("Successfully downloaded the Slay Download Service")
