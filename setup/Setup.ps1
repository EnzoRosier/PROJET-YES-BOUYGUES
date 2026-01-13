Write-Host "--== Installateur application compagnon BOUYGUES ==--" -ForegroundColor Blue

$projectPath = Get-Location

Set-Location $projectPath

Write-Host "SELECTIONEZ UNE BASE DE DONNEE DE DEPART : " -ForegroundColor Yellow
Write-Host " - CLEAN : Base de donnee quasi vierge ne contenant qu'un seul super admin afin de commencer la configuration" -ForegroundColor Yellow
Write-Host " - TEST : Base de donnee avec super admin, admin, site et vote pour tester ou demonstration" -ForegroundColor Yellow

$ChoixDB = "not selected"
while ($ChoixDB -eq "not selected") {
    $ChoixDB = Read-Host "Choix (CLEAN/TEST)"
    if ($ChoixDB -eq "CLEAN") {
        Write-Host "INITIALISATION BASE DE DONNEE CLEAN" -ForegroundColor Green
        Copy-Item "$projectPath/DB/CLEAN.db" -Destination "$projectPath/../back/db.db"
    } elseif ($ChoixDB -eq "TEST") {
        Write-Host "INITIALISATION BASE DE DONNEE TEST" -ForegroundColor Green
        Copy-Item "$projectPath/DB/TEST.db" -Destination "$projectPath/../back/db.db"
    } else {
        Write-Host "CHOIX INVALIDE" -ForegroundColor Red
        $ChoixDB = "not selected"
    }
}

Write-Host "INDIQUER CLE CHIFFRAGE JWT : " -ForegroundColor Yellow
Write-Host "Entrez une chaine de caractere permettant le chiffrage des mots de passe" -ForegroundColor Yellow
Write-Host "/!\ CETTE CHAINE DE CARACTERE DOIT RESTER SECRETE /!\" -ForegroundColor Red
Write-Host "Plus cette chaine sera complexe (longue, aléatoire, avec majuscule, minuscule, chiffre, symbole), plus le chiffrage sera securise" -ForegroundColor Yellow
$jwtkey = Read-Host "CLE CHIFFRAGE"

$contenu = @(
    "JWT_SECRET=$jwtkey"
)

$contenu | Set-Content -Path "$projectPath/../back/.env"