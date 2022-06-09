from django.views.generic import TemplateView
from django.urls import path

from . import views

app_name = 'network'

urlpatterns = [
    path('', TemplateView.as_view(template_name='network/index.html')),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("", views.index, name="index")
]
