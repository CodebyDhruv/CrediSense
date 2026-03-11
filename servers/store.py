import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    # Fallback to empty mocked client for local testing without Supabase credentials if desired,
    # or just let it raise an exception later. We'll set it to None for now.
    print("WARNING: SUPABASE_URL or SUPABASE_KEY is missing. Database operations will fail.")
    supabase = None

# We can keep the dicts temporarily as a fallback, or replace them entirely.
# Let's replace the dict variables with mock "collections/repositories" that 
# routes.py can interact with, abstracting away the raw dictionaries.
# Note: since routes.py does direct dict assignments like `applications_db[id] = app`,
# we should ideally provide proxy objects that override `__setitem__` and `__getitem__`,
# or we refactor routes.py.
# Refactoring routes.py is safer. For now, we'll implement a Database wrapper so we can update routes.py.

class Database:
    @property
    def client(self) -> Client:
        if not supabase:
            raise Exception("Supabase client not initialized. Please set SUPABASE_URL and SUPABASE_KEY.")
        return supabase

db = Database()

# Expose these as empty dicts temporarily so routes.py doesn't crash on import,
# but we will replace them in routes.py
applications_db = {}    
documents_db = {}       
insights_db = {}        
research_db = {}        
cam_reports_db = {}
