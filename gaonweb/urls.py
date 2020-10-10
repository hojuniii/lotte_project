from django.contrib import admin
from django.urls import path, include
from . import views
import api.urls
from . import views

urlpatterns = [
    path("place", views.place , name="place"),
    path("members", views.members , name="members"),
]