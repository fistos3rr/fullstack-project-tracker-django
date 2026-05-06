from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class ProjectStatus(models.TextChoices):
    PLANNED = "PLANNED", _("Planned")  
    ACTIVE = "ACTIVE", _("Active")   
    COMPLETED = "COMPLETED", _("Completed")  


class Project(models.Model):
    id = models.AutoField(primary_key=True)
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

    class Meta:
        ordering = ["-updated_at"]

    EXCLUDE_FIELDS = ["id", "created_at", "updated_at", "owner"]

    def save(self, *args, **kwargs):
        """
        Override save method to save logs.
        """

        if self.pk:
            old = Project.objects.get(pk=self.pk)   
            for field in self._meta.get_fields():  
                if field.is_relation:
                    continue
                field_name = field.name
                if field_name in self.EXCLUDE_FIELDS:
                    continue

                old_val = getattr(old, field_name)
                new_val = getattr(self, field_name)

                if old_val != new_val:
                    ProjectLog.objects.create(  
                        project=self,
                        field=field_name,
                        old_value=str(old_val),
                        new_value=str(new_val),
                    )

        super().save(*args, **kwargs)


class ProjectLog(models.Model):
    id = models.AutoField(primary_key=True)
    field = models.CharField(max_length=30, blank=False, default="")
    old_value = models.TextField(blank=True, null=True)
    new_value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="logs")

    class Meta:
        ordering = ["-created_at"]


class ProjectComment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="comments"
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="comments", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-created_at"]
