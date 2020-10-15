from django.contrib import admin
from django.urls import path, include
from . import views
import api.urls

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path("place", views.place , name="place"),
    path("members", views.members , name="members"),
    path("signin", views.signin , name="signin"),
    path("logout_view", views.logout_view , name="logout_view"),
    path("signup", views.signup , name="signup"),
    path("mypage", views.mypage , name="mypage"),
]