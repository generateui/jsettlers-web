git checkout gh-pages
git merge master
call GenerateProtobuf.bat
call GenerateBundle.bat
git add .
git commit -m "regen"
git push
git checkout master