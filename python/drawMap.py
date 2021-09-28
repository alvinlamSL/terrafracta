import os, json

class Map:
  def __init__(
    self,
    jsonFile = None,
    cols = 30,
    rows = 20,
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

  def addTracks(self, colStart, colEnd, rowStart, rowEnd, trackName):
    if colStart == colEnd: colEnd += 1
    if rowStart == rowEnd: rowEnd += 1
    for x in range(colStart, colEnd):
      for y in range(rowStart, rowEnd):
        self.tiles.append({
          "col": x,
          "row": y,
          "type": "tracks",
          "name": trackName
        })

  def saveJson(self):
    jTup = {
      "cols": self.cols,
      "rows": self.rows,
      "tiles": self.tiles
    }
    with open('./map3.json', 'w') as jFile:
      json.dump(jTup, jFile)

map = Map()
map.addTracks(5, 26, 3, 3, "ew")
map.addTracks(5, 26, 17, 17, "ew")
map.addTracks(3, 3, 5, 16, "ns")
map.addTracks(27, 27, 5, 16, "ns")
map.addTracks(4, 4, 3, 3, "esw")
map.addTracks(3, 3, 4, 4, "sne")
map.addTracks(4, 4, 17, 17, "enw")
map.addTracks(3, 3, 16, 16, "nse")
map.addTracks(26, 26, 3, 3, "wse")
map.addTracks(27, 27, 4, 4, "snw")
map.addTracks(26, 26, 17, 17, "wne")
map.addTracks(27, 27, 16, 16, "nsw")

map.saveJson()