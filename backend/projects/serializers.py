from rest_framework import serializers
from backend.projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "status",
            "created_at",
            "updated_at",
            "owner",
        ]


from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Project.objects.all(),  # type: ignore
    )

    class Meta:
        model = User
        fields = ["id", "username", "projects"]


from backend.projects.models import ProjectLog


class ProjectLogSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ProjectLog
        fields = ["id", "field", "old_value", "new_value", "created_at", "project"]
