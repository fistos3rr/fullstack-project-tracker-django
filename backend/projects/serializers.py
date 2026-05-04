from rest_framework import serializers
from backend.projects.models import Project, ProjectStatus


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description", "status", "created_at", "updated_at"]

#class ProjectSerializer(serializers.Serializer):
#    id = serializers.BigIntegerField(read_only=True)
#    name = serializers.CharField(required=True, max_length=30)
#    description = serializers.CharField()
#    status = serializers.ChoiceField(
#        choices=ProjectStatus, default=ProjectStatus.PLANNED
#    )
#    created_at = serializers.DateTimeField()
#    updated_at = serializers.DateTimeField()
#
#    def create(self, validated_data):
#        """
#        Create and return a new `Project` instance, given the validated data.
#        """
#        return Project.objects.create(**validated_data)
#
#    def update(self, instance, validated_data):
#        """
#        Update and return an existing `Project` instance, given the validated data.
#        """
#        instance.name = validated_data.get("name", instance.name)
#        instance.description = validated_data.get("description", instance.description)
#        instance.status = validated_data.get("status", instance.status)
#        instance.save()
#        return instance
