#!/bin/bash

echo '\033[31m-------------------------------';
echo '-------------------------------';
echo '\33[1;33m Building Front End';
echo '\033[31m-------------------------------';
echo '\33[1;34m-------------------------------';
cd ./src/main/webapp

ng build --prod --aot

echo '\033[31m-------------------------------';
echo '-------------------------------';
echo '\33[1;33m Building Back end';
echo '\033[31m-------------------------------';
echo '\33[1;34m-------------------------------';
rm -rf ../resources/static
mkdir ../resources/static
cp -a ./dist/tusker/* ../resources/static

cd ../../../

./mvnw clean install -DskipTests

