from backend.projects.models import Project
from backend.projects.serializers import ProjectSerializer
from rest_framework import permissions
from backend.projects.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework import viewsets


class ProjectViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """

    queryset = Project.objects.all()  # type: ignore
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

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


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "users": reverse("user-list", request=request, format=format),
            "projects": reverse("project-list", request=request, format=format),
        }
    )
