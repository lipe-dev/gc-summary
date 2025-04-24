#!/bin/bash

# Array of character names and their URLs
declare -A characters=(
    ["arme"]="https://static.wikia.nocookie.net/grandchase/images/8/87/CharIcon_Arme.png"
    ["lass"]="https://static.wikia.nocookie.net/grandchase/images/5/50/CharIcon_Lass.png"
    ["ryan"]="https://static.wikia.nocookie.net/grandchase/images/4/4a/CharIcon_Ryan.png"
    ["ronan"]="https://static.wikia.nocookie.net/grandchase/images/6/6c/CharIcon_Ronan.png"
    ["amy"]="https://static.wikia.nocookie.net/grandchase/images/f/f5/CharIcon_Amy.png"
    ["jin"]="https://static.wikia.nocookie.net/grandchase/images/5/50/CharIcon_Jin.png"
    ["sieghart"]="https://static.wikia.nocookie.net/grandchase/images/c/c9/CharIcon_Sieghart.png"
    ["mari"]="https://static.wikia.nocookie.net/grandchase/images/a/a2/CharIcon_Mari.png"
    ["dio"]="https://static.wikia.nocookie.net/grandchase/images/5/54/CharIcon_Dio.png"
    ["zero"]="https://static.wikia.nocookie.net/grandchase/images/e/ec/CharIcon_Zero.png"
    ["ley"]="https://static.wikia.nocookie.net/grandchase/images/1/12/CharIcon_Ley.png"
    ["rufus"]="https://static.wikia.nocookie.net/grandchase/images/7/77/CharIcon_Rufus.png"
    ["veigas"]="https://static.wikia.nocookie.net/grandchase/images/8/86/CharIcon_Veigas.png"
    ["rin"]="https://static.wikia.nocookie.net/grandchase/images/a/aa/CharIcon_Rin.png"
    ["asin"]="https://static.wikia.nocookie.net/grandchase/images/8/87/CharIcon_Asin.png"
    ["lime"]="https://static.wikia.nocookie.net/grandchase/images/a/a5/CharIcon_Lime.png"
    ["edel"]="https://static.wikia.nocookie.net/grandchase/images/9/9b/CharIcon_Edel.png"
    ["uno"]="https://static.wikia.nocookie.net/grandchase/images/f/f6/CharIcon_Uno.png"
    ["decanee"]="https://static.wikia.nocookie.net/grandchase/images/e/e2/CharIcon_Decanee.png"
    ["ai"]="https://static.wikia.nocookie.net/grandchase/images/3/3a/CharIcon_Ai.png"
    ["kallia"]="https://static.wikia.nocookie.net/grandchase/images/7/71/CharIcon_Kallia.png"
    ["lire"]="https://static.wikia.nocookie.net/grandchase/images/4/4d/CharIcon_Lire.png"
    ["elesis"]="https://static.wikia.nocookie.net/grandchase/images/a/aa/CharIcon_Elesis.png"
)

# Download each image
for char in "${!characters[@]}"; do
    echo "Downloading $char..."
    curl -L "${characters[$char]}" -o "public/characters/${char}.png"
done

echo "All images downloaded successfully!" 