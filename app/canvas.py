from flask import Flask
from flask import render_template
from flask import request
from flask import Response, g

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('drag.html')

@app.route('/raphael')
def raph():
    return render_template('raph.html')

if __name__ == '__main__':
    app.run('0.0.0.0')
