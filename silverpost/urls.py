# mysite/urls.py
from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
import gaonweb.views
import gaonweb.urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("api/auth", include("knox.urls")),
    path("", gaonweb.views.home , name="home"),
    path('gaonweb/', include(gaonweb.urls)),
] +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)