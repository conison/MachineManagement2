# StartService.ps1
param (
    [string]$serviceName
)

Start-Service -Name $serviceName

# StopService.ps1
param (
    [string]$serviceName
)

Stop-Service -Name $serviceName

# KillProcess.ps1
param (
    [string]$processName
)

Get-Process -Name $processName | Stop-Process -Force
