from django.db import models

# Create your models here.
class Badge(models.Model):
    description = models.CharField(max_length=300)
    cleanup_prereq = models.IntegerField()
    locked_image = models.ImageField(null=True, blank=True, upload_to="badges/")
    unlocked_image = models.ImageField(null=True, blank=True, upload_to="badges/")