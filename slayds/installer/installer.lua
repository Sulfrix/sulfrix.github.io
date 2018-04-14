local args = {...}
local file = args[1]
local path = http.get("https://theslaymann.github.io/slayds/content/programs/".. file ..".lua")
print("Downloading ".. args[1] .."...")
if not fs.exists("slaydsfiles/program") then
  if not fs.exists("slaydsfiles/") then
    fs.makeDir("slaydsfiles/")
  end
  local program = fs.open("slaydsfiles/program", "w")
  program.close()
end
program = fs.open("slaydsfiles/program", "w")
program.write(path.readAll())
program.close()
path.close()
print("Program has finished downloading. Run it?")
print("[Y] Run the program")
print("[N] Don't but save it")
print("[S] Save the program somewhere")
local event, key = os.pullEvent("key")
if key == keys.y or args[1] == "update" then
  shell.run("clear")
  shell.run("slaydsfiles/program")
end
if key == keys.n then
  print("File saved to slaydsfiles/program")
end
if key == keys.s then
  shell.run("clear")
  path = http.get("https://theslaymann.github.io/slayds/content/programs/".. file ..".lua")
  print("Enter the path for the program.")
  local destpath = read()
  program = fs.open(destpath, "w")
  program.write(path.readAll())
  program.close()
end
path.close()
