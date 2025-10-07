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
