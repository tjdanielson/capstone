from django.urls import path
from .import views

urlpatterns = [
    path('', views.CleanupList.as_view()),
    path('<int:pk>/', views.CleanupDetail.as_view()),
    path('user/<int:pk>/', views.CleanupUser.as_view()),
    path('addresses/', views.AddressList.as_view()),
    path('addresses/<int:id>/', views.AddressDetail.as_view()),
    path('userStats/<int:user_id>/', views.UserCleanupStats.as_view())
]