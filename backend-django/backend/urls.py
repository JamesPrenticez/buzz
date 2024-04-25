from django.contrib import admin
from django.urls import path, include
from api.views import LoginUserView, UserListView, CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path("admin", admin.site.urls),
  path("api/users", UserListView.as_view(), name="user-list"),
  path("api/login", LoginUserView.as_view(), name="login"),
  path("api/register", CreateUserView.as_view(), name="register"),
  path("api/token", TokenObtainPairView.as_view(), name="get_token"),
  path("api/refresh", TokenRefreshView.as_view(), name="refresh"),
  path("api-auth", include("rest_framework.urls")),
  path("api", include("api.urls")),
]
