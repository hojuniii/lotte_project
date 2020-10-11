from django.urls import path, include
from .views import HelloAPI, RegistrationAPI, LoginAPI, UserAPI, ProfileUpdateAPI, Box_create, Box_view, Box_update, Service_Place_create
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("hello/", HelloAPI),
    path("auth/register", RegistrationAPI.as_view()),
    path("auth/login", LoginAPI.as_view()),
    path("auth/user", UserAPI.as_view()),
    path("auth/profile/<int:user_pk>/update", ProfileUpdateAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path("auth/newbox", Box_create.as_view()),
    path("auth/boxs", Box_view.as_view()),    
    path("auth/box/<int:box_number>/update", Box_update.as_view()),
    path("auth/newplace", Service_Place_create.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)