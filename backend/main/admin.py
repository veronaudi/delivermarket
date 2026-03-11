from django.contrib import admin
from .models import UserProfile, Inventory

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'created_at')
    search_fields = ('user__username',)

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_for_sale', 'sale_price', 'added_at')
    list_filter = ('is_for_sale',)
    search_fields = ('user__username', 'skin__name')
