# from django.db import models
# from cleanups.models import Cleanup

# # Create your models here.
# class Address(models.Model):
#     cleanup = models.ForeignKey(Cleanup, on_delete=models.CASCADE)
#     street = models.CharField(max_length=300)
#     city = models.CharField(max_length=100)
#     state = models.CharField(max_length=100)
#     zip = models.IntegerField()
#     latitude = models.DecimalField(max_digits=9, decimal_places=7)
#     longitude = models.DecimalField(max_digits=9, decimal_places=7)