import requests
import json

def test_backend():
    base_url = "http://127.0.0.1:5051"
    
    # Test Registration Endpoint
    register_url = f"{base_url}/api/auth/register"
    register_data = {
        "email": "testuser@example.com",
        "phone": "1234567890",
        "password": "testpassword",
        "full_name": "Test User",
        "role": "client"
    }

    try:
        print("\n--- Testing Registration Endpoint ---")
        register_response = requests.post(register_url, json=register_data)
        print(f"Registration Response Status: {register_response.status_code}")
        print(f"Registration Response Body: {register_response.text}")
        
        if register_response.status_code == 201:
            print("User registered successfully.")
        elif register_response.status_code == 400 and "Email already registered" in register_response.text:
            print("User already registered, proceeding to login.")
        else:
            print("Registration failed or unexpected response.")
            return # Stop if registration definitely failed

    except requests.exceptions.ConnectionError as e:
        print(f"Error: Could not connect to the backend server for registration. Is it running on {base_url}? {e}")
        return
    except Exception as e:
        print(f"An unexpected error occurred during registration: {e}")
        return

    # Test login endpoint
    login_url = f"{base_url}/api/auth/login"
    login_data = {
        "email": "testuser@example.com",
        "password": "testpassword"
    }
    
    try:
        print("\n--- Testing Login Endpoint ---")
        login_response = requests.post(login_url, json=login_data)
        print(f"Login Response Status: {login_response.status_code}")
        print(f"Login Response Body: {login_response.text}")
        
        if login_response.status_code == 200:
            access_token = login_response.json().get("data", {}).get("token")
            if access_token:
                print(f"Access Token: {access_token[:30]}...") # Print partial token for brevity
            else:
                print("Access token not found in response.")
            
            # Example: Test a protected endpoint with the token (if available)
            # headers = {"Authorization": f"Bearer {access_token}"}
            # protected_url = f"{base_url}/api/some_protected_route"
            # protected_response = requests.get(protected_url, headers=headers)
            # print(f"Protected Endpoint Status: {protected_response.status_code}")
            # print(f"Protected Endpoint Body: {protected_response.text}")

    except requests.exceptions.ConnectionError as e:
        print(f"Error: Could not connect to the backend server. Is it running on {base_url}? {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    test_backend() 