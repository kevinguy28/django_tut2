from django.urls import path
from . import views

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

def csrf(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE', '')})

urlpatterns = [
    path('', views.getRoutes, name="route"),
    path('csrf/', csrf),
    path('notes/', views.getNotes, name="notes"),
    path('notes/create/', views.createNote, name="create-note"),
    path('notes/<str:pk>/update/', views.updateNote, name="update-note"),
    path('notes/<str:pk>/delete/', views.deleteNote, name="delete-note"),
    path('notes/<str:pk>/', views.getNote, name="note"),
]