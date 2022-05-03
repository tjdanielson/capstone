from django.urls import path
from .import views

urlpatterns = [
    path('', views.CleanupList.as_view()),
    path('<int:pk>/', views.CleanupDetail.as_view())
]