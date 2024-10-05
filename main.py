import eel

# Initialize the Eel library
eel.init('web')

# Expose this function to JavaScript
@eel.expose
def say_hello_py(name):
    print(f'Hello from {name}')
    return f'Hello, {name}!'

# Start the application
eel.start('main.html')
