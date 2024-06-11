import Instance from "./instance.services";

// export const fetchMerchandise = async () =>{
//     try {
//         const response = await Instance.get("api for merchandise");
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching Merchandise:", error);
//     }
// }
export const fetchPendingMerchandise = () =>{
    return[
        {
            itemName: "T-shirt",
            details: "Comfortable cotton T-shirt",
            points: 100,
            photoUrl: "https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg"
          },
          {
            itemName: "Cap",
            details: "Stylish baseball cap",
            points: 50,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNo2BHMDVamcFfmWRcewrobTkbxoa6GwqLw&s"
          },
          {
            itemName: "Backpack",
            details: "Durable backpack for daily use",
            points: 200,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9CXH97vyVZ_8_SWjBFkuKiBaqv5fyQz5_g&s"
          }
    ]
}

export const fetchCompletedMerchandise = () =>{
    return [
        {
            itemName: "Backpack",
            details: "Durable backpack for daily use",
            points: 200,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9CXH97vyVZ_8_SWjBFkuKiBaqv5fyQz5_g&s"
          },
          {
            itemName: "Water Bottle",
            details: "Reusable water bottle",
            points: 30,
            photoUrl: "https://atlasware.in/cdn/shop/products/Weblist_5_1200x.jpg?v=1646466781"
          }
    ]
}

export const completeMerchandise = () =>{

}

export const fetchMerchandise = () =>{
    return [
        {
          itemName: "T-shirt",
          details: "Comfortable cotton T-shirt",
          points: 100,
          photoUrl: "https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg"
        },
        {
          itemName: "Cap",
          details: "Stylish baseball cap",
          points: 50,
          photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNo2BHMDVamcFfmWRcewrobTkbxoa6GwqLw&s"
        },
        {
          itemName: "Backpack",
          details: "Durable backpack for daily use",
          points: 200,
          photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9CXH97vyVZ_8_SWjBFkuKiBaqv5fyQz5_g&s"
        },
        {
          itemName: "Water Bottle",
          details: "Reusable water bottle",
          points: 30,
          photoUrl: "https://atlasware.in/cdn/shop/products/Weblist_5_1200x.jpg?v=1646466781"
        },
        {
          itemName: "Sunglasses",
          details: "UV protection sunglasses",
          points: 150,
          photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdv5iDv8bq8LlxDZt9QXeS5Uk6EAfKL6hRGQ&s"
        },
        {
            itemName: "T-shirt",
            details: "Comfortable cotton T-shirt",
            points: 100,
            photoUrl: "https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg"
          },
          {
            itemName: "Cap",
            details: "Stylish baseball cap",
            points: 50,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNo2BHMDVamcFfmWRcewrobTkbxoa6GwqLw&s"
          },
          {
            itemName: "Backpack",
            details: "Durable backpack for daily use",
            points: 200,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9CXH97vyVZ_8_SWjBFkuKiBaqv5fyQz5_g&s"
          },
          {
            itemName: "Water Bottle",
            details: "Reusable water bottle",
            points: 30,
            photoUrl: "https://atlasware.in/cdn/shop/products/Weblist_5_1200x.jpg?v=1646466781"
          },
          {
            itemName: "Sunglasses",
            details: "UV protection sunglasses",
            points: 150,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdv5iDv8bq8LlxDZt9QXeS5Uk6EAfKL6hRGQ&s"
          }
      ];
}