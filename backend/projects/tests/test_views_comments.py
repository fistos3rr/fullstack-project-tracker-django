import pytest
from django.urls import reverse
from rest_framework import status
from backend.projects.models import ProjectStatus, Project, ProjectComment


# ---------- Project Comments Viewset Tests -------------
@pytest.mark.django_db
class TestProjectCommentViewSet:
    @pytest.fixture
    def comment_sample(self, owner, project_sample):
        return ProjectComment.objects.create(
            content="Test comment", owner=owner, project=project_sample
        )

    @pytest.fixture
    def comment_data(self):
        return {"content": "New comment"}

    @pytest.fixture
    def list_url(self, project_sample):
        return reverse(
            "project-comments-list", kwargs={"project_pk": project_sample.id}
        )

    @pytest.fixture
    def detail_url(self, project_sample, comment_sample):
        return reverse(
            "project-comments-detail",
            kwargs={"project_pk": project_sample.id, "pk": comment_sample.id},
        )

    def test_unauthenticated_can_read_list(self, api_client, list_url, comment_sample):
        response = api_client.get(list_url)

        assert response.status_code == status.HTTP_200_OK
        assert response.json()["count"] == 1
        assert response.json()["results"][0]["content"] == comment_sample.content

    def test_unauthenticated_cannot_create_comment(
        self, api_client, list_url, comment_data
    ):
        response = api_client.post(list_url, comment_data, format="json")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert ProjectComment.objects.count() == 0

    def test_authenticated_can_create_comment(
        self, other_client, list_url, comment_data
    ):
        response = other_client.post(list_url, comment_data, format="json")

        assert response.status_code == status.HTTP_201_CREATED
        assert ProjectComment.objects.count() == 1

    def test_authenticated_can_delete_comment(
        self, owner_client, detail_url, comment_sample
    ):
        response = owner_client.delete(detail_url)

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert ProjectComment.objects.count() == 0

    def test_other_cannot_delete_comment(
        self, other_client, detail_url, comment_sample
    ):
        response = other_client.delete(detail_url)

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert ProjectComment.objects.count() == 1
        comment_sample.refresh_from_db()
        assert comment_sample is not None
