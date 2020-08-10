import face_recognition

from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from builtins import bytes
import base64
from Crypto import Random
import numpy as np

def encrypt(string1, password1):
    """
    It returns an encrypted string which can be decrypted just by the 
    password.
    """
    password = bytes(password1, encoding='utf-8')
    string = bytes(string1, encoding='utf-8')

    key = password_to_key(password)
    IV = make_initialization_vector()
    encryptor = AES.new(key, AES.MODE_CBC, IV)

    # store the IV at the beginning and encrypt
    k = IV + encryptor.encrypt(pad_string(string))
    return k

def decrypt(string, password1):
    
    password = bytes(password1, encoding='utf-8')
    key = password_to_key(password)   

    # extract the IV from the beginning
    IV = string[:AES.block_size]  
    decryptor = AES.new(key, AES.MODE_CBC, IV)

    string = decryptor.decrypt(string[AES.block_size:])
    k = str(unpad_string(string))

    return k[2:len(k) - 1]

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

def compare(encoding, path):
    
    unknown_image = face_recognition.load_image_file(path)
    
    
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
    results = face_recognition.compare_faces([encoding], unknown_encoding)
    return results[0]

def save_encoding(image_path, txt_filename, key):
    image = face_recognition.load_image_file(image_path)
    encoding = face_recognition.face_encodings(image)[0]

    f = open(txt_filename, 'wb')
    final = ""
    for i in encoding:
        final += str(i) + " "
    final = encrypt(final, key)
    
    f.write(final)

def load_and_compare(image_path, txt_filename, key):
    

    f = open(txt_filename, 'rb')
    
    k = decrypt(f.read(), key)
    kk = np.fromstring(k, dtype=float, sep=' ')
    return compare(kk, image_path)

#save_encoding("train.jpg", "train.txt", "hello")
#print(load_and_compare("test1.jpg", "train.txt", "hello"))
