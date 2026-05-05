from backend.projects.models import Project
from backend.projects.serializers import ProjectSerializer
from rest_framework import permissions
from backend.projects.permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from backend.projects.models import ProjectLog, ProjectComment
from backend.projects.serializers import ProjectLogSerializer, ProjectCommentSerializer


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

    @action(detail=True, methods=["get"], url_path="comments", url_name="comments")
    def comments(self, request, pk=None):
        project = self.get_object()
        comments = project.comments.all()
        page = self.paginate_queryset(comments)
        if page is not None:
            return self.get_paginated_response(
                ProjectCommentSerializer(page, many=True).data
            )
        return Response(ProjectCommentSerializer(comments, many=True).data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


from django.contrib.auth.models import User
from backend.projects.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
