# Generated by Django 5.0.3 on 2025-02-15 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
