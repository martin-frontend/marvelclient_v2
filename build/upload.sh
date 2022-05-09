# sftp -oPort=50001 root@16.162.221.104
# cd /opt/webserver/h5/h5/universe/app
# lcd /Volumes/mine/myworks/marvelclient/web
# put -r dist/.
# exit

# owoh]choosh0neer7rooj2Ahpho7yoh^


#!/bin/bash
# SFTP配置信息
# IP
IP=16.162.221.104
# 端口
PORT=50001
# 用户名
USER=root
# 密码
PASSWORD=owoh]choosh0neer7rooj2Ahpho7yoh^
# 需要上传的文件所在目录
CLIENTDIR=/Volumes/mine/myworks/marvelclient_v2
# 上传到目标服务器的目录
SEVERDIR=/opt/webserver/h5/h5/universe/web

lftp -u ${USER},${PASSWORD} sftp://${IP}:${PORT} <<EOF
cd ${SEVERDIR}/
lcd ${CLIENTDIR}
mirror -R dist .
by
EOF