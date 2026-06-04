# Copy .env.example files if .env does not exist (Windows)
$root = Split-Path -Parent $PSScriptRoot

$serverEnv = Join-Path $root "server\.env"
$serverExample = Join-Path $root "server\.env.example"
if (-not (Test-Path $serverEnv) -and (Test-Path $serverExample)) {
  Copy-Item $serverExample $serverEnv
  Write-Host "Created server/.env — add your Supabase URL and service_role key"
}

$clientEnv = Join-Path $root "client\.env"
$clientExample = Join-Path $root "client\.env.example"
if (-not (Test-Path $clientEnv) -and (Test-Path $clientExample)) {
  Copy-Item $clientExample $clientEnv
  Write-Host "Created client/.env — add VITE_SUPABASE_URL and anon key"
}

Write-Host ""
Write-Host "Next: supabase.com -> SQL Editor -> run schema.sql, rls_policies.sql, seed.sql"
Write-Host "Then edit server/.env and client/.env, run: cd server; node scripts/verify-supabase.js"
