from django.contrib import admin

# Register your models here.
from .models import Officer, Sig, Event

@admin.register(Sig) # Tells the admin site to show the Sig model
class SigAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'meeting_time') # Sets the columns you see in the list
    search_fields = ('name', 'slug') # Adds a search bar for names and slugs
    prepopulated_fields = {'slug': ('name',)}  # Automatically fills the slug as you type the name

@admin.register(Event) # Tells the admin site to show the event model
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'sig') # Sets the columns you see in the list for Event
    search_fields = ('title', 'description') # Adds a search bar for titles and details
    list_filter = ('sig', 'date') # Adds a sidebar to filter the list by Sig or Date

@admin.register(Officer)
class OfficerAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'sig') # Sets the columns you see in the list for Officer
    search_fields = ('name', 'position') # Adds a search bar for names and positions
    list_filter = ('sig',) # Adds a sidebar to filter the list by Sig
