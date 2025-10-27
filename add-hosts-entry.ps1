# Add dev.roberthauta.com to hosts file
$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$entry = "`n127.0.0.1 dev.roberthauta.com"

# Check if entry already exists
$content = Get-Content $hostsPath -Raw
if ($content -notmatch "dev\.roberthauta\.com") {
    Add-Content -Path $hostsPath -Value $entry
    Write-Host "Successfully added dev.roberthauta.com to hosts file"
} else {
    Write-Host "Entry already exists in hosts file"
}