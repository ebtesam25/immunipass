import face_recognition

from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from builtins import bytes
import base64
from Crypto import Random

def encrypt(string, password):
    """
    It returns an encrypted string which can be decrypted just by the 
    password.
    """
    key = password_to_key(password)
    IV = make_initialization_vector()
    encryptor = AES.new(key, AES.MODE_CBC, IV)

    # store the IV at the beginning and encrypt
    return IV + encryptor.encrypt(pad_string(string))

def decrypt(string, password):
    key = password_to_key(password)   

    # extract the IV from the beginning
    IV = string[:AES.block_size]  
    decryptor = AES.new(key, AES.MODE_CBC, IV)

    string = decryptor.decrypt(string[AES.block_size:])
    return unpad_string(string)

def password_to_key(password):
    """
    Use SHA-256 over our password to get a proper-sized AES key.
    This hashes our password into a 256 bit string. 
    """
    return SHA256.new(password).digest()
def make_initialization_vector():
   
    return Random.new().read(AES.block_size)

def pad_string(string, chunk_size=AES.block_size):
  
    assert chunk_size  <= 256, 'We are using one byte to represent padding'
    to_pad = (chunk_size - (len(string) + 1)) % chunk_size
    return bytes([to_pad]) + string + bytes([0] * to_pad)
def unpad_string(string):
    to_pad = string[0]
    return string[1:-to_pad]

print(decrypt(b';\xde\xbf\t\xe7\x8f@D \xb0\xae\n\x81iB\xe5"\xba)\x05\t9\xf7\x8a\xd2P5\xdaq9#\xf3', bytes("hello", encoding='utf-8')))

def compare(encoding, path):
    
    unknown_image = face_recognition.load_image_file(path)
    
    
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
    results = face_recognition.compare_faces([encoding], unknown_encoding)
    return results[0]


image = face_recognition.load_image_file("train.jpg")
encoding = face_recognition.face_encodings(image)[0]
print(str(encoding))
print(compare(encoding, "test.jpg"))
print(compare(encoding, "test1.jpg"))