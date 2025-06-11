import os
import psycopg2
import redis
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

def test_postgresql():
    try:
        conn = psycopg2.connect(
            dbname="fixlink",
            user="fixlink_user",
            password="FixLink2024@DB#Password",
            host="localhost"
        )
        print("✅ PostgreSQL connection successful!")
        conn.close()
    except Exception as e:
        print(f"❌ PostgreSQL connection failed: {str(e)}")

def test_redis():
    try:
        r = redis.Redis(
            host='localhost',
            port=6379,
            password='FixLink2024@Redis#Password',
            decode_responses=True
        )
        r.ping()
        print("✅ Redis connection successful!")
    except Exception as e:
        print(f"❌ Redis connection failed: {str(e)}")

def test_email():
    try:
        smtp_server = "smtp.gmail.com"
        port = 587
        sender_email = "fixlinkug8@gmail.com"
        password = "smiz nalj tuyv wcfd"
        
        server = smtplib.SMTP(smtp_server, port)
        server.starttls()
        server.login(sender_email, password)
        
        msg = MIMEText("This is a test email from FixLink.")
        msg['Subject'] = 'FixLink Connection Test'
        msg['From'] = sender_email
        msg['To'] = sender_email
        
        server.send_message(msg)
        server.quit()
        print("✅ Email configuration successful!")
    except Exception as e:
        print(f"❌ Email configuration failed: {str(e)}")

if __name__ == "__main__":
    print("Testing FixLink connections...")
    print("\nTesting PostgreSQL...")
    test_postgresql()
    
    print("\nTesting Redis...")
    test_redis()
    
    print("\nTesting Email...")
    test_email() 