# Generated by Django 3.1.2 on 2020-10-21 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20201021_1857'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='qr_img',
            field=models.ImageField(blank=True, default='images/qr1689127512.png', null=True, upload_to='images/'),
        ),
    ]