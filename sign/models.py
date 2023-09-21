from django.db import models
from django.utils import timezone

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

class AuthUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class AuthUser(AbstractBaseUser, PermissionsMixin):
    status_choice = (
        (0, '停止中'),
        (1, '仮登録'),
        (2, 'アクティブ'),
    )

    id = models.CharField(primary_key=True, max_length=255, null=False, blank=False, unique=True)
    display_id = models.BigIntegerField()
    email = models.EmailField(blank=False, unique=True)
    status = models.IntegerField(choices=status_choice, default=0)
    delete_flg = models.BooleanField(default=False)
    updated_at = models.DateTimeField(blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    objects = AuthUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'

class ManagerProfile(models.Model):
    id = models.CharField(primary_key=True, max_length=255, null=False, blank=False, unique=True)
    manager = models.OneToOneField(AuthUser, on_delete=models.CASCADE, related_name="manager_profile")
    family_name = models.CharField(max_length=255,null=True)
    first_name = models.CharField(max_length=255,null=True)
    family_name_kana = models.CharField(max_length=255,null=True)
    first_name_kana = models.CharField(max_length=255,null=True)
    updated_at = models.DateTimeField(blank=False, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'manager_profile'