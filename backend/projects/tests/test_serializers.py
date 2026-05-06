from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import serializers
from backend.projects.models import Project, ProjectStatus
from backend.projects.serializers import ProjectSerializer


class ProjectSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="owner", password="123", email="test@example.com"
        )
        self.completed_project = Project.objects.create(
            name='Completed Test',
            description='Completed Test',
            status=ProjectStatus.COMPLETED,
            owner=self.user,
        )
        self.active_project = Project.objects.create(
            name='Active Test',
            description='Active Test',
            status=ProjectStatus.ACTIVE,
            owner=self.user,
        )

    def test_cannot_update_completed_project(self):
        serializer = ProjectSerializer(
            instance=self.completed_project,
            data={'description': 'Update'},
            partial=True
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn('status', serializer.errors)
        self.assertIn('cannot be changed', str(serializer.errors['status']))

    def test_can_update_uncompleted_project(self):
        serializer = ProjectSerializer(
            instance=self.active_project,
            data={'description': 'Update'},
            partial=True,
        )
        self.assertTrue(serializer.is_valid())
        project = serializer.save()
        self.assertEqual(project.description, 'Update')

