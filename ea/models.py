from django.db import models
from django.utils import timezone

class EaUser(models.Model):
    id = models.CharField(primary_key=True, max_length=255, null=False, blank=False, unique=True)
    display_id = models.BigIntegerField()
    login = models.BigIntegerField()
    delete_flg = models.BooleanField(default=False)
    updated_at = models.DateTimeField(blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'ea_user'

class EaUserProfile(models.Model):
    id = models.CharField(primary_key=True, max_length=255, null=False, blank=False, unique=True)
    user = models.ForeignKey(EaUser, on_delete=models.CASCADE, blank=True, null=True, related_name="ea_user_profile")
    email = models.EmailField(blank=True, null=True, unique=True)
    family_name = models.CharField(max_length=255, null=True)
    first_name = models.CharField(max_length=255, null=True)
    family_name_kana = models.CharField(max_length=255, null=True)
    first_name_kana = models.CharField(max_length=255, null=True)
    updated_at = models.DateTimeField(blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'ea_user_profile'

class EaData(models.Model):
    id = models.CharField(primary_key=True, max_length=255, null=False, blank=False, unique=True)
    display_id = models.BigIntegerField()
    user = models.ForeignKey(EaUser, on_delete=models.CASCADE, blank=True, null=True, related_name="ea_data")
    type = models.CharField(max_length=255, blank=True, null=True)
    ticket = models.CharField(max_length=255, blank=True, null=True)
    symbol = models.CharField(max_length=255, blank=True, null=True)
    magic_number = models.CharField(max_length=255, blank=True, null=True)
    lots = models.CharField(max_length=255, blank=True, null=True)
    swap = models.CharField(max_length=255, blank=True, null=True)
    open_price = models.CharField(max_length=255, blank=True, null=True)
    open_time = models.CharField(max_length=255, blank=True, null=True)
    close_price = models.CharField(max_length=255, blank=True, null=True)
    close_time = models.CharField(max_length=255, blank=True, null=True)
    stop_loss = models.CharField(max_length=255, blank=True, null=True)
    commission = models.CharField(max_length=255, blank=True, null=True)
    expiration = models.CharField(max_length=255, blank=True, null=True)
    profit = models.CharField(max_length=255, blank=True, null=True)
    take_profit = models.CharField(max_length=255, blank=True, null=True)
    comment = models.TextField(max_length=1000, blank=True, null=True)
    delete_flg = models.BooleanField(default=False)
    updated_at = models.DateTimeField(blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'ea_data'