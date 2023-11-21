# import os
# import shutil
# def ipfsupload(imagepath,description):
#     name = os.path.abspath(imagepath)
#     name = imagepath.split("/")[-1].replace(".png", "").replace(".jpg", "")
#     shutil.copy(imagepath, os.path.abspath("ipfsimage")+"//"+name+".png")
#     print("node upload.mjs {} {} {}".format("ipfsimage/"+name+".png", name ,description))    
#     f=os.popen("node upload.mjs {} '{}' '{}'".format("ipfsimage/"+name+".png", name ,description))  

  
#     print(imagepath)
#     print(os.path.abspath("ipfsimage")+"//"+name+".png")
#     a = f.read()
#     a = a.replace("Token","").replace('\n', '').replace('\r', '').replace(" ","").replace("{ipnft:'","").replace("'}", "")
#     ipnft = a.split("',url:'")[0]
#     url = a.split("',url:'")[-1]

#     # returndata = {
#     #     "ipnft":'bafyreif2x2b6vua6wukex2ti2uyjehazhzh2pnllm6cvv2qw3y5jh2fiqq',
#     #     "url":'ipfs://bafyreif2x2b6vua6wukex2ti2uyjehazhzh2pnllm6cvv2qw3y5jh2fiqq/metadata.json',
#     # }
#     returndata = {
#         "ipnft":ipnft,
#         "url":url,
#     }    
#     print(returndata)

#     return returndata

# # ipfsupload(r"/Users/hosanna/hackathon/online2023-ethglobal/Happy-Planet-v2/frontend/public/aiImage/IMG_0754_ai.png", "123")
# # /Users/hosanna/hackathon/online2023-ethglobal/Happy-Planet-v2/frontend/public/aiImage/IMG_0754_ai.png
import os
from PIL import Image
def ipfsupload(imagepath,description):
    name = os.path.abspath(imagepath)
    name = imagepath.split("/")[-1].split(".")[0]
    img = Image.open(os.path.abspath(imagepath))
    img.save(os.path.abspath("ipfsimage")+"/"+name+".png")
    f=os.popen("node upload.mjs {} {} {}".format("ipfsimage/"+name+".png", name ,description))    
    print(imagepath)
    print(os.path.abspath("ipfsimage")+"/"+name+".png")
    a = f.read()
    a = a.replace("Token","").replace('\n', '').replace('\r', '').replace(" ","").replace("{ipnft:'","").replace("'}", "")
    ipnft = a.split("',url:'")[0]
    url = a.split("',url:'")[-1]

    returndata = {
        "ipnft":ipnft,
        "url":url,
    }    
    print(returndata)

    return returndata