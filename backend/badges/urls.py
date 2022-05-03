from django.urls import path
from .import views

urlpatterns = [
    path('', views.BadgeList.as_view()),
    path('<int:pk>/', views.BadgeDetail.as_view())
]