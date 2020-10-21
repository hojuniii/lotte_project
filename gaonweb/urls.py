

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views
import api.urls

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path("place", views.place, name="place"),
    path("members", views.members , name="members"),
    path("placetemp/<int:temp>", views.placetemp, name="placetemp"),
    path("membersearch",views.members_search,name="membersearch"),
    path("signin", views.signin , name="signin"),
    path("logout_view", views.logout_view , name="logout_view"),
    path("signup", views.signup , name="signup"),
    path("mypage", views.mypage , name="mypage"),
    path("setprofile", views.setprofile,name="setprofile"),
    path("saveprofile", views.saveprofile,name="saveprofile"),
    path("boxcreate", views.boxcreate, name="boxcreate"),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)