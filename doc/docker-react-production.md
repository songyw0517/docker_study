# * 간단한 어플을 실제로 배포해보기
## Travis CI란?
- Github에서 진행되는 오픈소스 프로젝트를 위한 지속적인 통합(Continuous Integration)서비스
- Travis CI를 이용하면 Github repository에 있는 프로젝트를 특정 이벤트에 따라 자동으로 <span style="color:yellow;">테스트</span>, 빌드하거나 <span style="color:yellow;">배포</span>할 수 있다.
- Private repository는 유료로 일정 금액을 지불하고 사용할 수 있다.

<br>

## Travis CI의 흐름
로컬 git -> github -> Travis CI -> AWS

1. 로컬 git에 있는 소스를 Github 저장소에 push
2. Github master 저장소에 소스가 Push되면 Travis CI에게 소스가 push됨을 알림
3. Travis CI는 업데이트된 소스를 Github에서 가져옴
4. Github에서 가져온 소스의 테스트 코드를 수행
5. 테스트 코드 실행 후, 테스트가 성공하면 AWS같은 호스팅 사이트로 보내어 배포한다.

## Travis CI 이용 순서
1. Github과 Travis CI 연결하기
    - [Travis CI 사이트](https://travis-ci.org)로 이동
    - Github 아이디로 회원가입 후 로그인
2. Github의 리포지토리 소스코드를 Travis CI에서 가져갈 수 있게 설정하기
    - Travis CI 사이트의 Setting들어가기
    - 프로젝트 리포지토리 선택 (없을시 Sync account을 누른뒤 확인)
    - setting -> Migrate에서 어떤 리포지토리를 활성화시킬 것인지 선택할 수 있다.
3. .travis.yml 작성하기<br>
    다음과 같은 내용들을 작성한다.
    - Github에서 Travis CI로 소스코드를 어떻게 전달시킬 것인지
    - 어떻게 Test할 것인지
    - 어떻게 AWS에 전달해서 배포할 것인지
