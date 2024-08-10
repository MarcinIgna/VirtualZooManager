from django.core.exceptions import ValidationError
from django.db import models
import re

# Validation function for weight
def validate_weight(value):
    if value < 0 or value > 1000000:
        raise ValidationError('Weight must be between 0 and 1000000.')

# Validation function for extinct_since
def validate_extinct_since(value):
    # Regex pattern to match dates like "1000 BCE" or "500 CE"
    if not re.match(r'^\d{1,15} (BCE|CE)$', value):
        raise ValidationError('Extinct since must be in the format "YYYY BCE" or "YYYY CE".')

# Hologram model definition
class Hologram(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField(validators=[validate_weight])
    superpower = models.CharField(max_length=100)
    extinct_since = models.CharField(max_length=20, validators=[validate_extinct_since])

    def __str__(self):
        return self.name
