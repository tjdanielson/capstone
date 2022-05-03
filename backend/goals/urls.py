from django.urls import path
from .import views

urlpatterns= [
    path('', views.GoalList.as_view()),
    path('<int:id>/', views.GoalDetail.as_view()),
]