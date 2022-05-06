from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.CleanupList.as_view()),
    path('<int:pk>/', views.CleanupDetail.as_view()),
    path('user/<int:pk>/', views.CleanupUser.as_view()),
    path('addresses/', views.AddressList.as_view()),
    path('addresses/<int:id>/', views.AddressDetail.as_view()),
    path('userStats/<int:user_id>/', views.UserCleanupStats.as_view()),
    path('topUsers/', views.TopUsers.as_view()),
    path('communityStats/', views.CommunityStats.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)