# docker volume
- volume을 사용하기 전에는 소스코드가 변경될 때마다 
<br>재빌드를 하여 이미지를 만들고 다시 컨테이너를 실행해야하는 번거로움이 있었다.
- volume을 사용하면 도커 컨테이너에서 소스코드를 ```참조```하는 방법을 사용함으로써
<br>번거로움을 줄일 수 있다.

## docker volume 사용하기
- ```$ docker run -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app [이미지 아이디]``` // (리눅스)
- ```> docker run -p 5000:8080 -v /usr/src/app/node_modules -v %cd%:/usr/src/app [이미지 아이디]``` // (윈도우)
- 코드설명
  - -v /usr/src/app/node_modules : 호스트 디렉토리에 node_module은 없기에 컨테이너에 매핑을 하지 말라는 것
  - 파일의 경로는 WORKDIR에 설정한 경로이다.
  ### node_modules?
    -  종속성을 다운받은 것들이 보관되는 장소
    -  하지만, 현재 진행하는데 있어서 node_modules라는 디렉토리가 없기에 추가하여 매핑하지 말라고 알린다.
  - $(pwd):/usr/src/app : pwd 경로에 있는 디렉토리 혹은 파일을 /usr/src/app 경로에서 참조
