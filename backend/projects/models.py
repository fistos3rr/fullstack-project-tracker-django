from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class ProjectStatus(models.TextChoices):
    PLANNED = "PLANNED", _("Planned")  # type: ignore
    ACTIVE = "ACTIVE", _("Active")  # type: ignore
    COMPLETED = "COMPLETED", _("Completed")  # type: ignore


class Project(models.Model):
    name = models.CharField(max_length=30, blank=False, default="")
    description = models.TextField()
    status = models.CharField(
        max_length=20, choices=ProjectStatus.choices, default=ProjectStatus.PLANNED
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="projects", on_delete=models.CASCADE
    )
