#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
git add -A
git commit -m $1
echo '自动发布'
git push origin ly
git checkout master
git pull 
echo '拉取完成'
git merge ly
git push origin master
git checkout ly
echo '自动发布完成'
