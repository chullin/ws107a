最常用的指令
$ git clone https://github.com/cccnqu/ws107a
$ git add -A
$ git commit -m "modify at lecture 2"
$ git push origin master

與老師的專案同步
https://github.com/cccnqu/ws107a
$ git remote add upstream https://github.com/cccnqu/ws107a.git
$ git fetch upstream
$ git pull upstream master

再推回你自己的 github 中

$ git push origin master