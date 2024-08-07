from django.core.exceptions import ValidationError
from django.db import models

# Definition of weight validation
def validate_weight(value):
    if value < 0 or value > 1000:
        raise ValidationError('weight need to be between 0 and 1000')

# Definition of Hologram model
class Hologram(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField(validators=[validate_weight])
    superpower = models.CharField(max_length=100)
    extinct_since = models.IntegerField()

    def __str__(self):
        return self.name
