import pytest
from django.urls import reverse
from rest_framework import status
from backend.projects.models import ProjectStatus, Project, ProjectLog


# ---------- Project Viewset Tests -------------
@pytest.mark.django_db
class TestProjectViewSet:
    list_url = reverse("project-list")

    @pytest.fixture
    def detail_url(self, project_sample):
        return reverse("project-detail", kwargs={"pk": project_sample.id})

    def test_unauthenticated_can_list_projects(self, api_client, project_sample):
        response = api_client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["count"] == 1
        assert response.json()["results"][0]["name"] == project_sample.name

    def test_unauthenticated_cannot_create_project(self, api_client, project_data):
        response = api_client.post(self.list_url, project_data, format="json")
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert Project.objects.count() == 0

    def test_authenticated_can_create_project(self, owner_client, project_data):
        response = owner_client.post(self.list_url, project_data, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert Project.objects.count() == 1
        project = Project.objects.first()
        assert project
        assert project.name == project_data["name"]

    def test_unauthenticated_can_retrieve_project(
        self, api_client, detail_url, project_sample
    ):
        response = api_client.get(detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["name"] == project_sample.name

    def test_unauthenticated_cannot_edit_project(self, api_client, detail_url):
        assert Project.objects.count() == 1
        response = api_client.delete(detail_url)
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert Project.objects.count() == 1

    def test_other_cannot_edit_project(
        self, other_client, detail_url, project_data, project_sample
    ):
        old_name = project_sample.name

        response = other_client.put(detail_url, project_data, format="json")

        assert response.status_code == status.HTTP_403_FORBIDDEN
        project_sample.refresh_from_db()
        assert project_sample.name == old_name

        response = other_client.delete(detail_url)

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert Project.objects.count() == 1
        assert project_sample.name == old_name

    def test_owner_can_edit_project(
        self, owner_client, detail_url, project_data, project_sample
    ):
        response = owner_client.put(detail_url, project_data, format="json")

        assert response.status_code == status.HTTP_200_OK
        project_sample.refresh_from_db()
        assert project_sample.name == project_data["name"]

        response = owner_client.delete(detail_url)

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Project.objects.count() == 0

    def test_owner_cannot_edit_completed_project(
        self, owner_client, detail_url, project_sample, project_data
    ):
        owner_client.patch(
            detail_url, {"status": ProjectStatus.COMPLETED}, format="json"
        )
        response = owner_client.patch(detail_url, project_data, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        project_sample.refresh_from_db()
        assert project_sample.status == ProjectStatus.COMPLETED

    def test_owner_can_delete_completed_project(self, owner_client, detail_url):
        owner_client.patch(
            detail_url, {"status": ProjectStatus.COMPLETED}, format="json"
        )
        assert Project.objects.count() == 1
        response = owner_client.delete(detail_url)

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Project.objects.count() == 0

    def test_put(self, owner_client, detail_url):
        response = owner_client.put(
            detail_url, {"status": ProjectStatus.COMPLETED}, format="json"
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    # ----- LOGS TEST ------
    @pytest.fixture
    def log_url(self, project_sample):
        return reverse("project-logs", kwargs={"pk": project_sample.id})

    def test_logs(self, owner_client, detail_url, log_url, project_data):
        owner_client.put(detail_url, project_data, format="json")

        response = owner_client.get(log_url)

        assert response.status_code == status.HTTP_200_OK
        assert ProjectLog.objects.count() == 3
