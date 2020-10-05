# api/serializers.py
from rest_framework import serializers
from rest_framework import viewsets, permissions, generics, status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile

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


# 접속 유지중인지 확인
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


# 로그인
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("아이디 혹은 비밀번호가 일치하지 않습니다")


# 기본적으로 프로필 정보 조회에 필요한 프로필 ModelSerializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("user_pk", "nickname", "phone",)
        extra_kwargs = {'user': {'required': False}}