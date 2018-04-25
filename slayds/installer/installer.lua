local args = {...}
local action = args[1]
local file = args[2]
local destpath = args[3]
if action = update then
  file = "update"
  action = "run"
end
if action = nil then
  print("Usage:")
  print("slayds run <file> - downloads a file to run")
  print("slayds save <file> <path> - downloads a file and saves it to the path")
  return
end
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
if action == "run" then
  shell.run("clear")
  shell.run("slaydsfiles/program")
  fs.delete("slaydsfiles/program")
end
if action == "save" then
  shell.run("clear")
  path = http.get("https://theslaymann.github.io/slayds/content/programs/".. file ..".lua")
  program = fs.open(destpath, "w")
  program.write(path.readAll())
  program.close()
end
path.close()
