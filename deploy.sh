#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
git pull
echo '拉取完成'
git add -A
git commit -m $1
echo '自动发布'
git push origin ly
git checkout master
git merge ly
git checkout ly
echo '自动发布完成'
