from django.contrib import admin

# Register your models here.
from .models import Officer, Sig, Event 


admin.site.site_header = "ACM Club Management Portal"
admin.site.site_title = "ACM Admin"
admin.site.index_title = "Welcome to the ACM Dashboard"
@admin.register(Sig) # Tells the admin site to show the Sig model
class SigAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'meeting_time') # Sets the columns you see in the list
    search_fields = ('name', 'slug') # Adds a search bar for names and slugs
    prepopulated_fields = {'slug': ('name',)}  # Automatically fills the slug as you type the name
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Eboard/important people see everything 
        if request.user.is_superuser:
            return qs
        # SIG Chairs only see the SIG matching their Django Group name 
        user_groups = request.user.groups.values_list('name', flat=True)
        return qs.filter(name__in=user_groups)

    def has_change_permission(self, request, obj=None):
        if not obj or request.user.is_superuser:
            return True
        user_groups = request.user.groups.values_list('name', flat=True)
        return obj.name in user_groups
@admin.register(Event) # Tells the admin site to show the event model
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'sig') # Sets the columns you see in the list for Event
    search_fields = ('title', 'description') # Adds a search bar for titles and details
    list_filter = ('sig', 'date') # Adds a sidebar to filter the list by Sig or Date
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # Filter events by the SIG they belong to [cite: 15]
        user_groups = request.user.groups.values_list('name', flat=True)
        return qs.filter(sig__name__in=user_groups)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # This prevents them from assigning an event to a different SIG
        if db_field.name == "sig" and not request.user.is_superuser:
            user_groups = request.user.groups.values_list('name', flat=True)
            kwargs["queryset"] = Sig.objects.filter(name__in=user_groups)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
@admin.register(Officer)
class OfficerAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'sig') # Sets the columns you see in the list for Officer
    search_fields = ('name', 'position') # Adds a search bar for names and positions
    list_filter = ('sig',) # Adds a sidebar to filter the list by Sig
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        user_groups = request.user.groups.values_list('name', flat=True)
        return qs.filter(sig__name__in=user_groups)