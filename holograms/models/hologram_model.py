from django.db import models

class Hologram(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    superpower = models.CharField(max_length=100)
    extinct_since = models.IntegerField()


    def __str__(self):
        return self.name