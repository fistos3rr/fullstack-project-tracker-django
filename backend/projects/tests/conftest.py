from rest_framework_simplejwt.tokens import RefreshToken
import pytest
from django.contrib.auth.models import User
from backend.projects.models import ProjectStatus, Project


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def owner():
    return User.objects.create_user(
        username="owner", email="owner@example.com", password="pass"
    )


@pytest.fixture
def other():
    return User.objects.create_user(
        username="other", email="other@example.com", password="pass"
    )


@pytest.fixture
def owner_client(api_client, owner):
    refresh = RefreshToken.for_user(owner)
    access_token = str(refresh.access_token)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    return api_client


@pytest.fixture
def other_client(api_client, other):
    refresh = RefreshToken.for_user(other)
    access_token = str(refresh.access_token)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    return api_client


@pytest.fixture
def project_sample(owner):
    return Project.objects.create(
        name="Test project",
        description="Test description",
        owner=owner,
        status=ProjectStatus.PLANNED,
    )


@pytest.fixture
def project_data():
    return {
        "name": "New project",
        "description": "New description",
        "status": ProjectStatus.ACTIVE,
    }
