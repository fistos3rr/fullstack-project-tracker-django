from backend.projects.views import api_root, ProjectViewSet, UserViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

project_list = ProjectViewSet.as_view({"get": "list", "post": "create"})
project_detail = ProjectViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)
user_list = UserViewSet.as_view({"get": "list"})
user_detail = UserViewSet.as_view({"get": "retrieve"})


urlpatterns = format_suffix_patterns(
    [
        path("", api_root),
        path("projects/", project_list, name="project-list"),
        path("projects/<int:pk>/", project_detail, name="project-detail"),
        path("users/", user_list, name="user-list"),
        path("users/<int:pk>/", user_detail, name="user-detail"),
    ]
)
