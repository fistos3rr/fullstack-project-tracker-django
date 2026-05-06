from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from backend.projects import views


router = DefaultRouter()
router.register(r"projects", views.ProjectViewSet, basename="project")
router.register(r"users", views.UserViewSet, basename="user")

comments_router = NestedDefaultRouter(router, 'projects', lookup='project')
comments_router.register('comments', views.ProjectCommentViewSet, basename='project-comments')

urlpatterns = [
    path("", include(router.urls)),
    path("", include(comments_router.urls))
]
