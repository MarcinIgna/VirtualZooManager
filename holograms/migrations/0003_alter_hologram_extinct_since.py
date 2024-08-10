# Generated by Django 5.0.7 on 2024-08-07 09:02

import holograms.models.hologram_model
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holograms', '0002_alter_hologram_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hologram',
            name='extinct_since',
            field=models.CharField(max_length=20, validators=[holograms.models.hologram_model.validate_extinct_since]),
        ),
    ]
