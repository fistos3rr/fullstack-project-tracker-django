import pytest
from django.urls import reverse
from rest_framework import status
from pytest_lazyfixture import lazy_fixture
from django.contrib.auth.models import User
from backend.projects.models import ProjectStatus, Project



@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def owner():
    return User.objects.create_user(username='owner', email='owner@example.com', password='pass')

@pytest.fixture
def other():
    return User.objects.create_user(username='other', email='other@example.com', passowrd='pass')

@pytest.fixture
def owner_client(api_client, owner):
    api_client.force_authenticate(user=owner)
    return api_client

@pytest.fixture
def other_client(api_client, other):
    api_client.force_authenticate(user=other)
    return api_client

@pytest.fixture
def project_sample(owner):
    return Project.objects.create(
        name='Test project',
        description='Test description',
        owner=owner,
        status=ProjectStatus.PLANNED
    )

@pytest.fixture
def project_data():
    return {
        'name': 'New project',
        'description': 'New description',
        'status': ProjectStatus.ACTIVE,
    }


# ---------- Project Viewset Tests -------------
@pytest.mark.django_db
class TestProjectViewSet:
    list_url = reverse('project-list')

    @pytest.fixture
    def detail_url(self, project_sample):
        return reverse('project-detail', kwargs={'pk': project_sample.id})

    def test_unauthenticated_can_list_projects(self, api_client, project_sample):
        response = api_client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['count'] == 1
        assert response.json()['results'][0]['name'] == project_sample.name

    def test_unauthenticated_cannot_create_project(self, api_client, project_data):
        response = api_client.post(self.list_url, project_data, format='json')
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert Project.objects.count() == 0

    def test_authenticated_can_create_project(self, owner_client, project_data):
        response = owner_client.post(self.list_url, project_data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert Project.objects.count() == 1
        project = Project.objects.first()
        assert project
        assert project.name == project_data['name']

    def test_unauthenticated_can_retrieve(self, api_client, detail_url, project_sample):
        response = api_client.get(detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['name'] == project_sample.name
