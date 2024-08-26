from flask import Flask, request, jsonify,render_template
import tensorflow as tf
import numpy as np; 
app = Flask(__name__)

age = None  # Define age as a global variable initially



@app.route('/')
def first_page():
    return render_template('firstpage.html')

@app.route('/index.html')
def index():
    return render_template('index.html')


@app.route("/play_game", methods=["POST"])
def play_game():
  global age  # Access the global age variable
  if request.method == "POST":
    # Access data from request
    age1 = request.get_json()
    age = age1
    print(age)

    # Potentially return a response or redirect based on game logic
    return jsonify({'message': 'recieved'})

  return "Invalid request method"  # Handle non-POST requests (optional)


@app.route('/your-backend-endpoint', methods=['POST'])
def receive_data():
    # Access data from request
    global age  # Access the global age variable
    data = request.get_json()
    print(data)

    # Get the data for key '1' (assuming keys are strings)
    total_clicks_round_1 = data['1']['totalClicks']
    correct_clicks_round_1 = data['1']['correctClicks']
    missing_clicks_round_1 = data['1']['missingClicks']
    accuracy_round_1 = data['1']['accuracy']

    total_clicks_round_2 = data['2']['totalClicks']
    correct_clicks_round_2 = data['2']['correctClicks']
    missing_clicks_round_2 = data['2']['missingClicks']
    accuracy_round_2 = data['2']['accuracy']

    total_clicks_round_3 = data['3']['totalClicks']
    correct_clicks_round_3 = data['3']['correctClicks']
    missing_clicks_round_3 = data['3']['missingClicks']
    accuracy_round_3 = data['3']['accuracy']

    total_clicks_round_4 = data['4']['totalClicks']
    correct_clicks_round_4 = data['4']['correctClicks']
    missing_clicks_round_4 = data['4']['missingClicks']
    accuracy_round_4= data['4']['accuracy']

    total_clicks_round_5 = data['5']['totalClicks']
    correct_clicks_round_5 = data['5']['correctClicks']
    missing_clicks_round_5 = data['5']['missingClicks']
    accuracy_round_5 = data['5']['accuracy']

    total_clicks_round_6 = data['6']['totalClicks']
    correct_clicks_round_6 = data['6']['correctClicks']
    missing_clicks_round_6 = data['6']['missingClicks']
    accuracy_round_6 = data['6']['accuracy']

    total_clicks_round_7 = data['7']['totalClicks']
    correct_clicks_round_7 = data['7']['correctClicks']
    missing_clicks_round_7 = data['7']['missingClicks']
    accuracy_round_7 = data['7']['accuracy']

    total_clicks_round_8 = data['8']['totalClicks']
    correct_clicks_round_8 = data['8']['correctClicks']
    missing_clicks_round_8 = data['8']['missingClicks']
    accuracy_round_8 = data['8']['accuracy']

    print(total_clicks_round_1)
    # Process data (e.g., calculate accuracy)

    age_int = int(age)

    # ...
    
    # Optionally return a response

    data = [age_int,total_clicks_round_1,correct_clicks_round_1,missing_clicks_round_1,accuracy_round_1,total_clicks_round_2,correct_clicks_round_2,missing_clicks_round_2,accuracy_round_2,total_clicks_round_3,correct_clicks_round_3,missing_clicks_round_3,accuracy_round_3,
            total_clicks_round_4,correct_clicks_round_4,missing_clicks_round_4,accuracy_round_4,total_clicks_round_5,correct_clicks_round_5,missing_clicks_round_5,accuracy_round_5,total_clicks_round_6,correct_clicks_round_6,missing_clicks_round_6,accuracy_round_6,
            total_clicks_round_7,correct_clicks_round_7,missing_clicks_round_7,accuracy_round_7,total_clicks_round_8,correct_clicks_round_8,missing_clicks_round_8,accuracy_round_8]
    
    x = np.array(data).reshape(1,33)

  

    model = tf.keras.models.load_model("ANN.h5")
    prediction = model.predict(x)
    print(prediction[0][0])

    result = prediction[0][0]
    result_str = str(result)


    print(x)

    if(result > 0.5) : {
        print("Dyslexia Detected")
    }
    if(result < 0.5) : {
        print("Dyslexia Not Detected")
    }


    return jsonify({'message': result_str})




if __name__ == '__main__':
    app.run(debug=True)


