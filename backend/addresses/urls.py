from django.urls import path
from .import views

urlpatterns = [
    path('', views.AddressList.as_view()),
    path('<int:pk>/', views.AddressDetail.as_view())
]