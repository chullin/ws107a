最常用的指令
$ git clone https://github.com/cccnqu/sp106b.git
$ git add -A
$ git commit -m "modify at lecture 2"
$ git push origin master
與老師的專案同步
https://gist.github.com/CristinaSolana/1885435
$ git remote add upstream git://github.com/cccnqu/sp106b.git
$ git fetch upstream
$ git pull upstream master
再推回你自己的 github 中

$ git push origin master