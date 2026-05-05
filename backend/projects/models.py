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

    EXCLUDE_FIELDS = ["id", "created_at", "updated_at", "owner"]

    def save(self, *args, **kwargs):
        """
        Override save method to save logs.
        """

        if self.pk:
            old = Project.objects.get(pk=self.pk)  # type: ignore
            for field in self._meta.get_fields():  # type: ignore
                if field.is_relation:
                    continue
                field_name = field.name
                if field_name in self.EXCLUDE_FIELDS:
                    continue

                old_val = getattr(old, field_name)
                new_val = getattr(self, field_name)

                if old_val != new_val:
                    ProjectLog.objects.create(  # type: ignore
                        project=self,
                        field=field_name,
                        old_value=str(old_val),
                        new_value=str(new_val),
                    )

        super().save(*args, **kwargs)


class ProjectLog(models.Model):
    field = models.CharField(max_length=30, blank=False, default="")
    old_value = models.TextField(blank=True, null=True)
    new_value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="logs")

    class Meta:
        ordering = ["-created_at"]
