# from flask import Flask, request, jsonify
from pytube import YouTube

# app = Flask(__name__)

# @app.route('/', methods=['GET'])
# def video_info():
#     video_url = request.args.get('video_url')
#     yt = YouTube(video_url)

#     video_streams = yt.streams.all()
#     object_list = []
#     for stream in video_streams:
#         try:
#             vid = {
#                 "title": yt.title,
#                 "url": stream.url,
#                 "res": stream.resolution
#             }
#             object_list.append(vid)
#         except:
#             print("error")

#     return jsonify('{"yo": "yo1"}')

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=3000)

# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, jsonify, request

# creating a Flask app
app = Flask(__name__)

# on the terminal type: curl http://127.0.0.1:5000/
# returns hello world when we use GET.
# returns the data that we send when we use POST.
@app.route('/', methods = ['GET', 'POST'])
def home():
	if(request.method == 'GET'):

		data = "hello world"
		return jsonify({'data': data})


# A simple function to calculate the square of a number
# the number to be squared is sent in the URL when we use GET
# on the terminal type: curl http://127.0.0.1:5000 / home / 10
# this returns 100 (square of 10)
@app.route('/home/<int:num>', methods = ['GET'])
def disp(num):

	return jsonify({'data': num**2})


# driver function
if __name__ == '__main__':

	app.run(debug = True)
