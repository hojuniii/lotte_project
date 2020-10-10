from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from knox.models import AuthToken
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, ProfileSerializer
from .models import Profile

# Create your views here.
@api_view(["GET"])
def HelloAPI(request):
    return Response("hello world!")

'''
@RegistrationAPI 
POST    api/auth/register
body - key: username, password
'''
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) != 11:
            body = {
                        "status" : "400", 
                        "message": "정확한 휴대폰 번호 11자리를 입력해주세요"
                    }
            return Response(body)
            
        elif len(request.data["password"]) < 4:
            body = {
                        "status" : "400",
                        "message": "비밀번호를 4자리 이상 입력해주세요"
                    }
            return Response(body)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "status" : "200",
                'message' : '회원가입에 성공하였습니다',
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                # "token": AuthToken.objects.create(user)[1],
            }
        )

'''
@LoginAPI 
POST    api/auth/login
body - key: username, password
'''
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) != 11:
            body = {
                        "status" : "400", 
                        "message": "정확한 휴대폰 번호 11자리를 입력해주세요"
                    }
            return Response(body)
            
        elif len(request.data["password"]) < 4:
            body = {
                        "status" : "400",
                        "message": "비밀번호를 4자리 이상 입력해주세요"
                    }
            return Response(body)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response(
            {
                "status" : "200",
                "message": "로그인 성공",
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )

'''
@UserAPI 
GET    api/auth/user
header - key: Authorization     value: Token e1d2ea7215c6a422ee9ced59d3abffe4f3b88d2fef50a32116a5673aaf28fe2e(토큰값)

 permission_classes = [permissions.IsAuthenticated] 이 코드로 인해
 post로 요청을 보낼 때 인증된 토큰이 없으면 오류를 보낸다! 즉 인증(로그인)된 회원만 UserAPI(로그인된 유저 조회) 기능에 접근 가능
 
 밑은 permision 옵션들
    AllowAny (디폴트 전역 설정) : 인증 여부에 상관없이 뷰 호출을 허용
    * IsAuthenticated : 인증된 요청에 한해서 뷰 호출 허용 (로그인이 되어있어야만 접근 허용)
    IsAdminUser : Staff 인증 요청에 한해서 뷰 호출 허용
    IsAuthenticatedOrReadOnly : 비인증 요청에게는 읽기 권한만 허용 (로그인이 되어 있지않아도 조회는 가능)
    DjangoModelPermissons : 인증된 요청에 한하여 뷰 호출 허용, 추가로 장고 모델단위 Permissions 체크
    DjangoModelPermissionsOrAnonReadOnly : DjangoModelPermissions와 유사, 비인증 요청에게는 읽기만 허용
    DjangoObjectPermissons : 비인증 요청은 거부, 인증된 요청은 Object에 대한 권한 체크 수행
'''
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer