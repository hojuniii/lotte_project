# Generated by Django 3.1.2 on 2020-10-21 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20201021_1903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='qr_img',
            field=models.ImageField(blank=True, default='images/qr1271392396.png', null=True, upload_to='images/'),
        ),
    ]