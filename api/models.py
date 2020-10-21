from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null =True, blank = True)
    user_pk = models.IntegerField(blank=True)
    nickname = models.CharField(max_length=200, blank=True)
    profile_image = models.ImageField(default='images/default.png',upload_to='images/', blank=True, null=True)
    service_place = models.CharField(max_length=200, blank=True)
    birth = models.CharField(max_length=6,blank = True)
    age = models.IntegerField(default=70)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, user_pk=instance.id)
        


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Box(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    box_number = models.CharField(max_length=20, unique=True, blank=True)
    customer_location = models.CharField(max_length=200, blank=True)
    customer_phonenum = models.CharField(max_length=200, blank=True)
    customer_name = models.CharField(max_length=200, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now=True)
    STATUS = (
        ("W", "배송 대기"),          #큐알 코드 찍기 전
        ("D", "배송 중"),           #큐알 코드 찍고 도착 전
        ("C", "배송 완료"),         #택배 도착
    )
    status = models.CharField(max_length=100, choices=STATUS, blank=True)
    def __str__(self):
        return self.box_number