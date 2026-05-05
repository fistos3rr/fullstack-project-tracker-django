from rest_framework import serializers
from backend.projects.models import Project, ProjectStatus


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

    def validate(self, attrs):
        if self.instance:
            project_status = self.instance.status

            if project_status == ProjectStatus.COMPLETED:
                raise serializers.ValidationError(
                    {"status": "Project cannot be changed. It has been completed."}
                )

        return attrs


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


from backend.projects.models import ProjectComment


class ProjectCommentSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = ProjectComment
        fields = ["id", "content", "created_at", "project", "owner"]
