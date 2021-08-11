import os, json

class Map:
  def __init__(
    self,
    jsonFile = None,
    cols = 50,
    rows = 50,
  ):
    self.cols = cols
    self.rows = rows
    self.tiles = []

    if jsonFile is not None and os.path.exists(jsonFile):
      with open(jsonFile) as jFile:
        jsonData = json.load(jFile)
        self.cols = jsonData['cols']
        self.rows = jsonData['rows']
        self.tiles = jsonData['tiles']

  def saveJson(self):
    jTup = {
      "cols": self.cols,
      "rows": self.rows,
      "tiles": self.tiles
    }
    with open('./map.json', 'w') as jFile:
      json.dump(jTup, jFile)

map = Map(jsonFile='map.json')
map.tiles.append({
  "col": 19,
  "row": 10,
  "type": "tracks",
  "name": "esw"
})
map.tiles.append({
  "col": 40,
  "row": 10,
  "type": "tracks",
  "name": "wse"
})
map.tiles.append({
  "col": 18,
  "row": 11,
  "type": "tracks",
  "name": "sne"
})
map.tiles.append({
  "col": 41,
  "row": 11,
  "type": "tracks",
  "name": "snw"
})
for x in range(12, 17):
  map.tiles.append({
    "col": 18,
    "row": x,
    "type": "tracks",
    "name": "ns"
  })
  map.tiles.append({
    "col": 41,
    "row": x,
    "type": "tracks",
    "name": "ns"
  })
map.tiles.append({
  "col": 18,
  "row": 17,
  "type": "tracks",
  "name": "nse"
})
map.tiles.append({
  "col": 19,
  "row": 18,
  "type": "tracks",
  "name": "enw"
})
map.tiles.append({
  "col": 41,
  "row": 17,
  "type": "tracks",
  "name": "nsw"
})
map.tiles.append({
  "col": 40,
  "row": 18,
  "type": "tracks",
  "name": "wne"
})
for x in range(20, 40):
  map.tiles.append({
    "col": x,
    "row": 18,
    "type": "tracks",
    "name": "ew"
  })


map.saveJson()