const data= [
    {
        id:1,
        title: "Taj Mahal Tour",
        blogs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque commodi magnam minima beatae culpa necessitatibus. Tenetur aperiam molestias incidunt voluptas facilis at perspiciatis dignissimos sint temporibus libero laudantium, dolore vero iste corporis explicabo quibusdam maxime quis odio iusto iure doloribus adipisci eius asperiores? Tenetur sapiente labore, voluptatibus illo dolores libero expedita. Veritatis, soluta ratione nostrum qui magnam provident explicabo pariatur minima sint? Magni iure natus ducimus eaque saepe repudiandae itaque labore alias nam! Repudiandae, amet. Modi, tenetur officia. Facere saepe accusantium molestias enim dicta delectus, ipsum ducimus id inventore magnam assumenda unde fuga excepturi aperiam quo odit "
    },
    {
        id:2,
        title: "College exam",
        blogs: "quaerat, earum commodi ea sed. Labore quidem, ad reiciendis minima sint saepe voluptatum quod eligendi eos sapiente repellat vel excepturi provident esse a ex est ipsum dicta quos laboriosam. Deleniti cum tenetur culpa molestias quaerat ipsam ab. Itaque totam quaerat libero, qui maiores vitae natus assumenda tenetur laborum cumque aliquid mollitia, id eos recusandae repellat eaque ullam? Tempora animi, dolorem aliquam, temporibus voluptatem deserunt nisi quos, obcaecati facere natus mollitia! Deserunt officiis sed quisquam placeat vel veniam fuga voluptatem possimus, praesentium, quasi voluptas minus esse in cupiditate laborum tempora fugit! Dolorem aliquid, error consequuntur numquam praesentium, modi eos et placeat ad labore doloribus?"
    },
    {
        id:3,
        title: "Canteen Play", 
        blogs: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur non exercitationem nam nesciunt. Doloribus ex odit saepe expedita blanditiis quo, quaerat quibusdam obcaecati corrupti, iusto distinctio autem deleniti sunt? aliquam, temporibus voluptatem deserunt nisi quos, obcaecati facere natus mollitia! Deserunt officiis sed quisquam placeat vel veniam fuga voluptatem possimus, praesentium, quasi voluptas minus esse in cupiditate laborum tempora fugit! Dolorem aliquid, error consequuntur numquam praesentium, modi eos et placeat ad labore doloribus?aliquam, temporibus voluptatem deserunt nisi quos, obcaecati facere natus mollitia! Deserunt officiis sed quisquam placeat vel veniam fuga voluptatem possimus, praesentium, quasi voluptas minus esse in cupiditate laborum tempora fugit! Dolorem aliquid, error consequuntur numquam praesentium, modi eos et placeat ad labore doloribus?"
    }
]


exports.function = function() {
    return data;
}

exports.function2 = function(obj) {
    data.push(obj);
}
