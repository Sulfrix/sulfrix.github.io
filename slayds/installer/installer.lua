function cleanmode ()
  local options = {
    cleanmode = false
  }
  shell.run("clear")
  print("Clean Mode Setting")
  print("Press Y to enable Clean Mode.")
  print("Press anything else to disable.")
  local event, key = os.pullEvent("key")
  if key == keys.y then
    options.cleanmode = true
  end
  local optfile = fs.open("slaydsfiles/options", "w")
  optfile.write(textutils.serialise(options))
  optfile.close()
end

local args = {...}
local action = args[1]
local file = args[2]

if not fs.exists("slaydsfiles/options") then
  cleanmode()
end

local optfile = fs.open("slaydsfiles/options", "r")
local options = textutils.unserialise(optfile.readAll())
optfile.close()

if action == nil and not options.cleanmode == true then 
  print("Usage:")
  print("slayds run <file>: Runs a file from SlayDS servers")
  print("slayds save <file> <path>: Saves a file to your computer at <path>")
  print("slayds run update: Updates SlayDS. Do this often.")
  print("slayds cleanmode: Change the Clean Mode option.")
  return
end

if options.cleanmode == true then
  shell.run("clear")
  term.setTextColor(colors.lightGray)
  print("Clean Mode")
  term.setTextColor(colors.white)
  print("Welcome to Slay Download System!")
  print("-----Actions-----")
  print("R - Downloads and runs a file")
  print("S - Saves a file at a path")
  print("C - Change your Clean Mode Preferences")
  print("E - Exit")
end

local options = fs.open()
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