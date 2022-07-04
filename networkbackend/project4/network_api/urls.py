from django.urls import path
from .views import BlacklistTokenView, PostList, PostDetail, UserCreate, UserList, UserDetail

app_name = 'network_api'

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate'),
    path('user', UserList.as_view(), name='user'),
    path('user/<int:pk>/', UserDetail.as_view(), name='user'),
    path('user/register/', UserCreate.as_view(), name='user_create'),
    path('user/logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
]
