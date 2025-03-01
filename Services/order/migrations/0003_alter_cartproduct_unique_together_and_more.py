# Generated by Django 5.0.3 on 2025-01-31 16:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_cartproduct_unique_together'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='cartproduct',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='cartproduct',
            name='product_variant',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='products.productvariant'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cartproduct',
            name='size',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='cartproduct',
            unique_together={('product', 'cart', 'product_variant')},
        ),
    ]
