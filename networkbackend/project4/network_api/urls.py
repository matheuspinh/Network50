from django.urls import path
from .views import PostList, PostDetail, UserList

app_name = 'network_api'

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate'),
    path('user', UserList.as_view(), name='user'),
]
