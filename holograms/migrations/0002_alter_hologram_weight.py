# Generated by Django 5.0.7 on 2024-08-07 08:53

import holograms.models.hologram_model
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holograms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hologram',
            name='weight',
            field=models.FloatField(validators=[holograms.models.hologram_model.validate_weight]),
        ),
    ]
