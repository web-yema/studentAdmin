#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
git status
git add -A
git commit -m $1
echo '自动发布'
git push origin why
git checkout master 
git merge why
git pull 
echo '拉取完成'
git push origin master
git checkout why
git merge master
echo '自动发布完成'
