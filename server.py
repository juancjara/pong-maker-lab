from gevent import monkey
monkey.patch_all()

import time
from threading import Thread
from flask import Flask, render_template, session, request
from flask.ext.socketio import SocketIO, emit, join_room, leave_room, \
    close_room, disconnect

thread = None


def background_thread():
    #simular enviar eventos al cliente
    #se puede enviar moveUp,moveDown,setCenter
    #con setCenter se puede ubicar la paleta en la posicion deseada
    while True:
        time.sleep(0.5)
        socketio.emit('moveUp','', namespace='/test')

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    global thread
    if thread is None:
        thread = Thread(target=background_thread)
        thread.start()
    return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('msg', 1234)
    print 123

if __name__ == "__main__":
    socketio.run(app)
