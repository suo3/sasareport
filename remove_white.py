from PIL import Image

def remove_white(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # white threshold
            # if R, G, B are all > 240
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                # Fully transparent
                newData.append((255, 255, 255, 0))
            elif item[0] > 215 and item[1] > 215 and item[2] > 215:
                # Blend the edges
                avg = (item[0] + item[1] + item[2]) / 3
                # map avg from 215 -> 240 to alpha 255 -> 0
                alpha = int(255 - ((avg - 215) * (255 / 25)))
                alpha = max(0, min(255, alpha))
                # For smooth blending on dark backgrounds, shift color slightly darker
                newData.append((item[0], item[1], item[2], alpha))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Successfully removed white background!")
    except Exception as e:
        print(f"Error: {e}")

remove_white("d:/Documents/GhanaWebSolutions/sasareport/public/avatar.png", "d:/Documents/GhanaWebSolutions/sasareport/public/avatar.png")
