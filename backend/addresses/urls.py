from django.urls import path
from .import views

urlpatterns = [
    path('', views.AddressList.as_view())
]