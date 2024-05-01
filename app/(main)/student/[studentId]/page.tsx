import React from "react";

interface pageParams {
  id: String;
}

function page({ params }: { params: { studentId: string } }) {
  return <div> Id : {params.studentId}</div>;
}

export default page;
