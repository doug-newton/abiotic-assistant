db.transforms.insertMany([{
  "input": [
    {
      "item": "pocket_watch",
      "quantity": 1
    }
  ],
  "transform": "scrapping",
  "output": [
    {
      "item": "tiny_gears",
      "quantity": 1
    },
    {
      "item": "exquisite_chain",
      "quantity": 1
    }
  ]
},
{
  "input": [
    {
      "item": "exquisite_chain",
      "quantity": 1
    }
  ],
  "transform": "scrapping",
  "output": [
    {
      "item": "silver_scrap",
      "quantity": 1
    }
  ]
},
{
  "input": [
    {
      "item": "tiny_gears",
      "quantity": 1
    }
  ],
  "transform": "trading",
  "output": [
    {
      "item": "reinforced_hose",
      "quantity": 1
    }
  ]
},
{
  "input": [
    {
      "item": "hose",
      "quantity": 1
    },
    {
      "item": "box_of_screws",
      "quantity": 1
    },
    {
      "item": "steel_cable",
      "quantity": 1
    }
  ],
  "transform": "crafting",
  "output": [
    {
      "item": "reinforced_hose",
      "quantity": 1
    }
  ]
},
{
  "input": [
    {
      "item": "reinforced_hose",
      "quantity": 1
    }
  ],
  "transform": "trading",
  "output": [
    {
      "item": "optic_lens",
      "quantity": 1
    }
  ]
}]);


db.items.insertMany([
    {
        "item": "box_of_screws",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Itemicon_screws.png"
    },
    {
        "item": "exquisite_chain",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Itemicon_silverchain.png"
    },
    {
        "item": "hose",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Itemicon_hose.png"
    },
    {
        "item": "optic_lens",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Optic_Lens.png"
    },
    {
        "item": "pocket_watch",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Pocket_Watch.png"
    },
    {
        "item": "reinforced_hose",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Reinforced_Hose.png"
    },
    {
        "item": "silver_scrap",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Silver_Scrap.png"
    },
    {
        "item": "steel_cable",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Steel_Cable.png"
    },
    {
        "item": "tiny_gears",
        "imageSrc": "https://abioticfactor.wiki.gg/images/Item_Icon_-_Tiny_Gears.png"
    }
])
