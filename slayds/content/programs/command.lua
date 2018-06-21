print("Interactive command block!")
print("Do /quit to exit program.")
while true do
  print("Enter command.")
  term.write("/")
  command = read()
  if command == "quit" then
    break
  end
  success, output = commands.exec(command)
  if success == false then
    term.setTextColor(colors.red)
    print("Error!")
  end
  print(output[1])
  term.setTextColor(colors.white)
end
  
