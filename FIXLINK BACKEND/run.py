from app import create_app

app = create_app()

if __name__ == '__main__':
    from app import socketio
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, port=5051, host="127.0.0.1") 