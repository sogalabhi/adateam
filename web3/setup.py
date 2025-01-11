import os
from groclake.cataloglake import CatalogLake

# Environment variable setup
GROCLAKE_API_KEY = '812b4ba287f5ee0bc9d43bbf5bbe87fb'
GROCLAKE_ACCOUNT_ID = '2565f91315efd36cfd3dc1119fec85ff'

os.environ['GROCLAKE_API_KEY'] = GROCLAKE_API_KEY
os.environ['GROCLAKE_ACCOUNT_ID'] = GROCLAKE_ACCOUNT_ID

# Initialize Groclake catalog instance
catalog = CatalogLake()