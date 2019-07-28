local args = {...}
local action = args[1]
local file = args[2]
if action == nil then
  print("Usage:")
  print("slayds run <file>: Runs a file from SlayDS servers")
  print("slayds save <file> <path>: Saves a file to your computer at <path>")
  print("slayds run update: Updates SlayDS. Do this often.")
  return
end
if file == nil then
  print("Please enter the desired file to download/run")
  return
end
local path = http.get("https://sulfrix.github.io/slayds/content/programs/".. file ..".lua")
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
if action == "run" then
  shell.run("clear")
  shell.run("slaydsfiles/program")
  fs.delete("slaydsfiles/program")
end
if action == "save" then
  if args[3] == nil then
    print("Specify a path.")
    return
  end
  shell.run("clear")
  path = http.get("https://sulfrix.github.io/slayds/content/programs/".. file ..".lua")
  local destpath = args[3]
  program = fs.open(destpath, "w")
  program.write(path.readAll())
  program.close()
end