from django.db import models
from django.utils.translation import gettext_lazy as _


class ProjectStatus(models.TextChoices):
    PLANNED = 'PLANNED', _('Planned')
    ACTIVE = 'ACTIVE', _('Active')
    COMPLETED = 'COMPLETED', _('Completed') 

class Project(models.Model):
    name = models.CharField(max_length=30, blank=False, default="")
    description = models.TextField()
    status = models.CharField(
            max_length=20,
            choices=ProjectStatus.choices,
            default=ProjectStatus.PLANNED
            )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
