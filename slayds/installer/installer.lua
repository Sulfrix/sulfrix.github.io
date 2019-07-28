local args = {...}
local action = args[1]
local file = args[2]
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
  shell.run("clear")
  path = http.get("https://sulfrix.github.io/slayds/content/programs/".. file ..".lua")
  local destpath = args[3]
  program = fs.open(destpath, "w")
  program.write(path.readAll())
  program.close()
end
path.close()
