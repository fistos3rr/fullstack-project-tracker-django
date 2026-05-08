from backend.projects.models import Project
from backend.projects.serializers import ProjectSerializer 
from rest_framework import permissions
from backend.projects.permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from backend.projects.models import ProjectLog, ProjectComment
from backend.projects.serializers import ProjectLogSerializer, ProjectCommentSerializer
from rest_framework.exceptions import NotFound


class ProjectViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    queryset = Project.objects.all()  
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=True, methods=["get"], url_path="logs", url_name="logs")
    def logs(self, request, pk=None):
        project = self.get_object()
        logs = project.logs.all()
        page = self.paginate_queryset(logs)
        if page is not None:
            return self.get_paginated_response(
                ProjectLogSerializer(page, many=True).data
            )
        return Response(ProjectLogSerializer(logs, many=True).data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectCommentViewSet(viewsets.ModelViewSet):
    """
    Projects comments viewset for creating and destroying comments.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = ProjectCommentSerializer

    def get_queryset(self):
        project_id = self.kwargs.get("project_pk")
        if project_id:
            return ProjectComment.objects.filter(project_id=project_id)
        return Project.objects.none()

    def perform_create(self, serializer):
        project_id = self.kwargs.get("project_pk")
        try:
            project = Project.objects.get(pk=project_id)
        except Project.DoesNotExist:
            raise NotFound("Project not found")
        serializer.save(project=project, owner=self.request.user)


from django.contrib.auth.models import User
from backend.projects.serializers import UserListSerializer, UserDetailSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """

    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer
        return UserDetailSerializer
