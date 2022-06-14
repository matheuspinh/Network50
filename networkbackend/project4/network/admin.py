from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post


class CustomUser(UserAdmin):
    pass


admin.site.register(Post)
admin.site.register(User, CustomUser)
