$content = Get-Content -Path "website.html" -Raw
Write-Output "HTML length: $($content.Length)"

# Find videos
$videoMatches = [regex]::Matches($content, '<video[\s\S]*?</video>')
foreach ($m in $videoMatches) {
    Write-Output "FOUND VIDEO: $($m.Value)"
}

# Find all video/image/audio urls
$urlMatches = [regex]::Matches($content, '["'']([^"'']+\.(mp4|webm|mov|png|jpg|jpeg|svg|webp|gif))["'']')
$uniqueUrls = @{}
foreach ($m in $urlMatches) {
    $uniqueUrls[$m.Groups[1].Value] = $true
}

Write-Output "--- Assets found ---"
foreach ($key in $uniqueUrls.Keys) {
    Write-Output $key
}
