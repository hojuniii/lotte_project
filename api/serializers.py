# api/serializers.py
from rest_framework import serializers
from rest_framework import viewsets, permissions, generics, status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile, Box

# 회원가입
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"], None, validated_data["password"]
        )
        return user


# 로그인
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("아이디 혹은 비밀번호가 일치하지 않습니다",code=401)

# 기본적으로 프로필 정보 조회에 필요한 프로필 ModelSerializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("user_pk", "nickname", "profile_image", "service_place")
        extra_kwargs = {'user': {'required': False}}


# 접속 유지중인지 확인
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = User
        fields = ("id", "username", "profile")

# Box, ServicePlace Serializers
class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__'

    
# class ServicePlaceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service_Place
#         fields = '__all__'