from django.test import TestCase
from unittest.mock import patch
from backend.projects.models import Project, ProjectStatus, ProjectLog
from django.contrib.auth.models import User


class ProjectModelTest(TestCase):
    def test_save_logs(self):
        owner = User.objects.create_user(
            username='testowner',
            email='test@example.com',
            password='secret',
        )
        project = Project.objects.create(
            name='Original',
            description='Old description',
            status=ProjectStatus.PLANNED,
            owner=owner
        )

        project.name = 'Updated'
        project.description = 'New description'
        project.status = ProjectStatus.ACTIVE

        project.save()

        logs = ProjectLog.objects.filter(project=project)
        self.assertEqual(logs.count(), 3)

        name_log = logs.get(field='name')
        self.assertEqual(name_log.old_value, 'Original')
        self.assertEqual(name_log.new_value, 'Updated')

        desc_log = logs.get(field='description')
        self.assertEqual(desc_log.old_value, 'Old description')
        self.assertEqual(desc_log.new_value, 'New description')

        status_log = logs.get(field='status')
        self.assertEqual(status_log.old_value, ProjectStatus.PLANNED)
        self.assertEqual(status_log.new_value, ProjectStatus.ACTIVE)
