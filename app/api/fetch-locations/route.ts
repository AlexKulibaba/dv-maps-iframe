// import { NextResponse } from "next/server";
// import axios from "axios";

// const url =
//   "https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/query?query=(select Projekte).Ort";

// export async function GET() {
//   try {
//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: "https://digital-vereinfacht.ninoxdb.de/v1/teams/xk9zrexbm17q6bfqc/databases/lryyv6de5s5z/query?query=(select Projekte).Ort",
//       headers: {
//         Authorization: "Bearer 40d25de0-19b8-11ef-b4f9-09d220c0ba76",
//         "Content-Type": "application/json",
//       },
//     };

//     const data = await axios.request(config).then((response) => {
//       const data = JSON.stringify(response.data);
//       return data;
//     });
//     // axios
//     //   .request(config)
//     //   .then((response) => {
//     //     const data = JSON.stringify(response.data);
//     //     return data;
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });

//     console.log(data);
//     if (!data) {
//       return new NextResponse("No projects found!", { status: 400 });
//     }

//     return new NextResponse(data, { status: 200 });
//   } catch (e) {
//     console.log("[CODE_ERROR]", e);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
