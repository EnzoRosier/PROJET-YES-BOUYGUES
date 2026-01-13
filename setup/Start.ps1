$projectPath = Get-Location
Set-Location "$projectPath/.."

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd back; npm run start:dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd front; serve -s build"