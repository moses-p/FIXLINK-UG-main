import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def setup_database():
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            user="postgres",
            password="FixLink2024@DB#Password",
            host="localhost",
            port="5432"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Create database if it doesn't exist
        cur.execute("SELECT 1 FROM pg_database WHERE datname='fixlink'")
        exists = cur.fetchone()
        if not exists:
            cur.execute('CREATE DATABASE fixlink')
            print("✅ Database 'fixlink' created successfully!")
        else:
            print("✅ Database 'fixlink' already exists!")
        
        # Connect to the new database
        conn.close()
        conn = psycopg2.connect(
            dbname="fixlink",
            user="postgres",
            password="FixLink2024@DB#Password",
            host="localhost",
            port="5432"
        )
        cur = conn.cursor()
        
        # Create user if it doesn't exist
        cur.execute("SELECT 1 FROM pg_roles WHERE rolname='fixlink_user'")
        exists = cur.fetchone()
        if not exists:
            cur.execute("CREATE USER fixlink_user WITH PASSWORD 'FixLink2024@DB#Password'")
            print("✅ User 'fixlink_user' created successfully!")
        else:
            print("✅ User 'fixlink_user' already exists!")
        
        # Grant privileges
        cur.execute("GRANT ALL PRIVILEGES ON DATABASE fixlink TO fixlink_user")
        print("✅ Privileges granted successfully!")
        
        conn.close()
        print("✅ Database setup completed successfully!")
        
    except Exception as e:
        print(f"❌ Error setting up database: {str(e)}")

if __name__ == "__main__":
    setup_database() 