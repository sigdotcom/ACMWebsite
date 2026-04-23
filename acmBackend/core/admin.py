from django.contrib import admin # Imports the admin module to customize the panel [cite: 84]

# Register your models here.
from .models import Officer, Sig, Event # Imports the collections defined in models.py [cite: 6, 81]

admin.site.site_header = "ACM Club Management Portal" # Sets the main heading of the admin dashboard 

admin.site.index_title = "Welcome to the ACM Dashboard" # Sets the welcome message on the index pag

@admin.register(Sig) # Tells the admin site to show the Sig model 
class SigAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'meeting_time_start', 'meeting_time_end') # Sets the columns you see in the list 
    search_fields = ('name', 'slug') # Adds a search bar for names and slugs 
    prepopulated_fields = {'slug': ('name',)}  # Automatically fills the slug as you type the name
    def get_queryset(self, request): # Controls which SIG records are visible to the user 
        qs = super().get_queryset(request) # Gets the base list of all SIGs
        # Eboard/important people see everything 
        if request.user.is_superuser: # Checks if the user has full admin access
            return qs # Returns the full list for superusers
        # SIG Chairs only see the SIG matching their Django Group name 
        user_groups = request.user.groups.values_list('name', flat=True) # Gets a list of the user's groups
        return qs.filter(name__in=user_groups) # Limits view to SIGs matching their group names

    def has_change_permission(self, request, obj=None): # Controls who can edit a specific SIG 
        if not obj or request.user.is_superuser: # Allows access if no object is selected or user is superuser
            return True # Grants permission
        user_groups = request.user.groups.values_list('name', flat=True) # Retrieves the user's group names
        return obj.name in user_groups # Only allows editing if SIG name matches their group 

@admin.register(Event) # Tells the admin site to show the event model
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'sig') # Sets the columns you see in the list for Event 
    search_fields = ('title', 'description') # Adds a search bar for titles and details 
    list_filter = ('sig', 'date') # Adds a sidebar to filter the list by Sig or Date 
    def get_queryset(self, request): # Restricts event list based on user group 
        qs = super().get_queryset(request) # Fetches all event records
        if request.user.is_superuser: # Check for Eboard/Superuser status
            return qs # Superusers see all events
        # Filter events by the SIG they belong to [cite: 15]
        user_groups = request.user.groups.values_list('name', flat=True) # Looks up assigned groups 
        return qs.filter(sig__name__in=user_groups) # Only shows events for their specific SIG 

    def has_change_permission(self, request, obj=None): # Prevents editing events from other SIGs 
        if not obj or request.user.is_superuser: # Bypasses check for new objects or superusers
            return True # Grants access
        user_groups = request.user.groups.values_list('name', flat=True) # Checks user's group list
        return obj.sig.name in user_groups # Verifies the event's SIG matches the user's group 

    def formfield_for_foreignkey(self, db_field, request, **kwargs): # Limits dropdown options in the form ]
        # This prevents them from assigning an event to a different SIG
        if db_field.name == "sig" and not request.user.is_superuser: # Targets the SIG selection field
            user_groups = request.user.groups.values_list('name', flat=True) # Gets group names
            kwargs["queryset"] = Sig.objects.filter(name__in=user_groups) # Limits dropdown to their SIG [cite: 21]
        return super().formfield_for_foreignkey(db_field, request, **kwargs) # Returns the filtered field

@admin.register(Officer) # Tells the admin site to show the officer model 
class OfficerAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'sig') # Sets the columns you see in the list for Officer 
    search_fields = ('name', 'position') # Adds a search bar for names and positions 
    list_filter = ('sig',) # Adds a sidebar to filter the list by Sig 
    def get_queryset(self, request): # Scopes the officer list to the user's SIG 
        qs = super().get_queryset(request) # Retrieves all officer records
        if request.user.is_superuser: # Checks if the user is an Eboard admin
            return qs # Shows all officers to superusers
        user_groups = request.user.groups.values_list('name', flat=True) # Identifies user's SIG groups 
        return qs.filter(sig__name__in=user_groups) # Filters for officers in their SIG only 

    def has_change_permission(self, request, obj=None): # Restricts editing to own SIG officers 
        if not obj or request.user.is_superuser: # Default check for superusers
            return True # Allows editing
        user_groups = request.user.groups.values_list('name', flat=True) # Gets user group names
        return obj.sig.name in user_groups # Ensures officer belongs to the user's SIG 

    def formfield_for_foreignkey(self, db_field, request, **kwargs): # Limits SIG choice for new officers 
        if db_field.name == "sig" and not request.user.is_superuser: # Targets SIG assignment field
            user_groups = request.user.groups.values_list('name', flat=True) # Fetches user groups
            kwargs["queryset"] = Sig.objects.filter(name__in=user_groups) # Limits choices to their SIG 
        return super().formfield_for_foreignkey(db_field, request, **kwargs) # Applies the filter