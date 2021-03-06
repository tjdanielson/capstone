from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView, UserBadges, UserList, UserDetail

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('getbadges/<int:user_id>/', UserBadges.as_view()),
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    #path('getBadges/', UserBadges.as_view())
    #path('getbadges/<int:user_id>/<int:badge_id>/', UserBadges.as_view()),
]
