import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Archived = () => {
    const [archivedData, setArchivedData] = useState("");

    useEffect(() => {
        axios({
          method: "get",
          url: "https://www.sobacke.in/api/getallarchievedevent",
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      console.log(archivedData)

  return (
    <div>
      hello
    </div>
  )
}

export default Archived
